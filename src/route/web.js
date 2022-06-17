import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

const router = express.Router();

const initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);

	router.get("/signUp", homeController.getSigupPage);

	router.post("/api/login", userController.handleLogin);
	router.get("/api/get-all-users", userController.handleGetAllUsers);
	router.post("/api/create-new-user", userController.handleCreateNewUser);
	router.put("/api/update-user", userController.handleEditUser);
	router.delete("/api/delete-user", userController.handleDeleteUser);

	router.post("/api/login-admin", userController.handleLoginAdmin);

	router.post("/api/add-cv", userController.handleCreateCV);
	router.get("/api/get-cv", userController.handleGetCV);
	router.put("/api/update-cv", userController.handleEditCV);
	router.delete("/api/delete-cv", userController.handleDeleteCV);

	router.post("/api/add-dm", userController.handleCreateDM);
	router.get("/api/get-dm", userController.handleGetDM);
	router.put("/api/update-dm", userController.handleEditDM);
	router.delete("/api/delete-dm", userController.handleDeleteDM);

	router.post("/api/add-ba", userController.handleCreateBA);
	router.get("/api/get-ba", userController.handleGetBA);
	router.put("/api/update-ba", userController.handleEditBA);
	router.delete("/api/delete-ba", userController.handleDeleteBA);

	router.post("/api/add-ma", userController.handleCreateMA);
	router.get("/api/get-ma", userController.handleGetMA);
	router.put("/api/update-ma", userController.handleEditMA);
	router.delete("/api/delete-ma", userController.handleDeleteMA);

	router.post("/api/add-nl", userController.handleCreateNL);
	router.get("/api/get-nl", userController.handleGetNL);
	router.put("/api/update-nl", userController.handleEditNL);
	router.delete("/api/delete-nl", userController.handleDeleteNL);

	router.post("/api/add-knl", userController.handleCreateKNL);
	router.get("/api/get-knl", userController.handleGetKNL);
	router.get("/api/get-knl-date", userController.handleGetKNLdate);
	router.put("/api/update-knl", userController.handleEditKNL);
	router.delete("/api/delete-knl", userController.handleDeleteKNL);

	router.post("/api/add-hd", userController.handleCreateHD);
	router.get("/api/get-hd", userController.handleGetHD);
	router.put("/api/update-hd", userController.handleEditHD);
	router.delete("/api/delete-hd", userController.handleDeleteHD);
	router.put("/api/update-tthd", userController.handleEditTTHD);


	router.get("/api/get-cthd", userController.handleGetCTHD);


	return app.use("/", router);
};

module.exports = initWebRoutes;
