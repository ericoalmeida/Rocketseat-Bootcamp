import React, { useCallback, useRef, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../componentes/Input';
import Button from '../../componentes/Button';
import getValidationErrors from '../../Utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface FormDataType {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormDataType) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),

          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, oldPassword, password } = data;

        const userData = Object.assign(
          { name, email },
          oldPassword && { oldPassword, password },
        );

        const response = await api.put('profile', userData);
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Aeww! =)',
          description: 'Perfil atualizado',
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Oops! :(',
          description: 'Falha durante a atualização perfil',
        });
      }
    },
    [history, addToast, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        try {
          const data = new FormData();

          data.append('avatar', e.target.files[0]);

          api.patch('users/avatar', data).then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Aeww! =)',
              description: 'Avatar atualizado!',
            });
          });
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Oops! :(',
            description: 'Falha durante a atualização do avatar',
          });
        }
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img
              src={
                user.avatar_url ||
                `https://api.adorable.io/avatars/186/${user.name}@adorable.io.png`
              }
              alt={user.name}
            />

            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
