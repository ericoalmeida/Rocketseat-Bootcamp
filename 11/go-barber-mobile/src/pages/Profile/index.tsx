import React, { useCallback, useRef } from 'react';
import ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../hooks/auth';

import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import * as Yup from 'yup';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../Utils/getValidationErrors';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Header,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleProfileUpdate = useCallback(
    async (data: ProfileFormData) => {
      try {
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

        const { name, email, password, oldPassword } = data;

        const profileData = Object.assign(
          { name, email },
          oldPassword && { oldPassword, password },
        );

        const response = await api.put('/profile', profileData);

        updateUser(response.data);

        Alert.alert('Aeww!', 'Perfil salvo com sucesso!!!');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Oops!', 'Algo ocorreu de errado!');
      }
    },
    [navigation, updateUser],
  );

  const handleAvatarUpdate = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma imagem',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar a câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Oops', 'Não consegui atualizar seu avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('/users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.Id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, paddingBottom: 1 }}
        >
          <Container>
            <Header>
              <BackButton onPress={handleGoBack}>
                <Icon name="chevron-left" size={26} color="#999591" />
              </BackButton>

              <UserAvatarButton onPress={handleAvatarUpdate}>
                <UserAvatar
                  source={{
                    uri: user.avatar_url
                      ? user.avatar_url
                      : `https://api.adorable.io/avatars/286/${user.name}@adorable.png`,
                  }}
                />
              </UserAvatarButton>
            </Header>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              initialData={user}
              ref={formRef}
              onSubmit={handleProfileUpdate}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="oldPassword"
                icon="lock"
                placeholder="Senha atual"
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="confirmPassword"
                icon="lock"
                placeholder="Confirmação senha"
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
