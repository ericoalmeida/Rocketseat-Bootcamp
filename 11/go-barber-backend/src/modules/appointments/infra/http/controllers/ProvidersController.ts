import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
