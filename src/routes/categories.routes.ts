import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );
    createCategoryService.execute({ name, description });
  } catch (error: any) {
    const message = error?.message;
    return response.status(400).send({ message });
  }

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  response.status(200).json(categories);
});

export { categoriesRoutes };
