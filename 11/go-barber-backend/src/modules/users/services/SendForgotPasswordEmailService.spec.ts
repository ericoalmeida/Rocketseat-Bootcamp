import faker from 'faker';

import FakeUserRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@users/repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/Providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmail from '@users/services/SendForgotPasswordEmailService';
import AppErrors from '@shared/errors/AppErrors';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover password using your email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUserRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password from user non existing', () => {
    expect(
      sendForgotPasswordEmail.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
