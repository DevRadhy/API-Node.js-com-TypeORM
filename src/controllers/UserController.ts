import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import UserView from "../views/users_view";

export default {
  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    const userRender = UserView.renderMany(users);

    return response.status(200).json(userRender);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    return response.status(200).json(user);
  },

  async create(request: Request, response: Response) {
    const { name, age } = request.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      age,
    };

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}