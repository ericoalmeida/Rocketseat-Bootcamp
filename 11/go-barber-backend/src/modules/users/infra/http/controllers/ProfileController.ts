import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@users/services/UpdateUserProfileService';
import ShowUserProfileService from '@users/services/ShowUserProfileService';

class ProfileController {
  public async show(request: Request, response: Response) {
    const user_id = request.user.id;
    const showUserProfile = container.resolve(ShowUserProfileService);

    const userProfile = await showUserProfile.execute({ user_id });

    return response.json(classToClass(userProfile));
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const updatedUser = await updateUserProfile.execute({
      user_id,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(classToClass(updatedUser));
  }
}

export default ProfileController;
