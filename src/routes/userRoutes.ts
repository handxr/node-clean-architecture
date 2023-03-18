import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/register", UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users list
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description:  User ID
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description:  User email
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 */
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/login", UserController.login);

export default router;
