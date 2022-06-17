import userSevice from "../services/userSevice";

const handleLogin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const userData = await userSevice.handleUserLogin(email, password);
	return res.status(200).json({
		errCode: userData.errCode,
		message: userData.message,
		user: userData.user || [],
	});
};
const handleLoginAdmin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const userData = await userSevice.handleAdminLogin(email, password);
	return res.status(200).json({
		errCode: userData.errCode,
		message: userData.message,
		user: userData.user || [],
	});
};
const handleGetAllUsers = async (req, res) => {
	const id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing repuired parameters",
			users: [],
		});
	} else {
		const users = await userSevice.getAllUsers(id);
		return res.status(200).json({
			errCode: 0,
			message: "ok",
			users: users,
		});
	}
};

const handleCreateNewUser = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewUser(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditUser = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateUser(data);
	return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteUser(req.body.id);
	return res.status(200).json(message);
};

const handleGetMA = async (req, res) => {
	const data = await userSevice.getAllMA();
	return res.status(200).json(data);
};
const handleDeleteMA = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteMA(req.body.id);
	return res.status(200).json(message);
};
const handleCreateMA = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewMA(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditMA = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateMA(data);
	return res.status(200).json(message);
};

const handleGetCV = async (req, res) => {
	// setTimeout(async () => {
	// 	const data = await userSevice.getAllCV();
	// 	return res.status(200).json(data);
	// }, 5000);
	const data = await userSevice.getAllCV();
	return res.status(200).json(data);
};
const handleDeleteCV = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteCV(req.body.id);
	return res.status(200).json(message);
};
const handleCreateCV = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewCV(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditCV = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateCV(data);
	return res.status(200).json(message);
};

const handleGetDM = async (req, res) => {
	const data = await userSevice.getAllDM();
	return res.status(200).json(data);
};
const handleDeleteDM = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteDM(req.body.id);
	return res.status(200).json(message);
};
const handleCreateDM = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewDM(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditDM = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateDM(data);
	return res.status(200).json(message);
};

const handleGetBA = async (req, res) => {
	const data = await userSevice.getAllBA();
	return res.status(200).json(data);
};
const handleDeleteBA = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteBA(req.body.id);
	return res.status(200).json(message);
};
const handleCreateBA = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewBA(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditBA = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateBA(data);
	return res.status(200).json(message);
};

const handleGetNL = async (req, res) => {
	const data = await userSevice.getAllNL();
	return res.status(200).json(data);
};
const handleDeleteNL = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteNL(req.body.id);
	return res.status(200).json(message);
};
const handleCreateNL = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewNL(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditNL = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateNL(data);
	return res.status(200).json(message);
};

const handleGetKNL = async (req, res) => {
	const data = await userSevice.getAllKNL();
	return res.status(200).json(data);
};
const handleGetKNLdate = async (req, res) => {
	const day = req.query.date;
	const data = await userSevice.getKNL(day);
	return res.status(200).json(data);
};
const handleDeleteKNL = async (req, res) => {
	if (!req.body.arrId) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteKNL(req.body.arrId);
	return res.status(200).json(message);
};
const handleCreateKNL = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewKNL(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditKNL = async (req, res) => {
	if (!req.body) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateKNL(data);
	return res.status(200).json(message);
};

const handleGetHD = async (req, res) => {
	const data = await userSevice.getAllHD();
	return res.status(200).json(data);
};
const handleDeleteHD = async (req, res) => {
	if (!req.body.arrId) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const message = await userSevice.deleteHD(req.body.arrId);
	return res.status(200).json(message);
};
const handleCreateHD = async (req, res) => {
	if (req.body) {
		const message = await userSevice.createNewHD(req.body);
		return res.status(200).json(message);
	} else {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
};
const handleEditHD = async (req, res) => {
	if (!req.body) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateHD(data);
	return res.status(200).json(message);
};

const handleEditTTHD = async (req, res) => {
	if (!req.body) {
		return res.status(200).json({
			errCode: 1,
			message: "Missing required parameters!",
		});
	}
	const data = req.body;
	const message = await userSevice.updateTTHD(data);
	return res.status(200).json(message);
};


const handleGetCTHD = async (req, res) => {
	const idHoaDon = req.query.idHoaDon;
	const data = await userSevice.getCTHD(idHoaDon);
	return res.status(200).json(data);
};
module.exports = {
	handleLogin: handleLogin,
	handleGetAllUsers: handleGetAllUsers,
	handleCreateNewUser: handleCreateNewUser,
	handleEditUser: handleEditUser,
	handleDeleteUser: handleDeleteUser,
	
	handleLoginAdmin: handleLoginAdmin,
	
	handleGetCV: handleGetCV,
	handleDeleteCV: handleDeleteCV,
	handleCreateCV: handleCreateCV,
	handleEditCV: handleEditCV,

	handleGetDM: handleGetDM,
	handleDeleteDM: handleDeleteDM,
	handleCreateDM: handleCreateDM,
	handleEditDM: handleEditDM,

	handleCreateBA: handleCreateBA,
	handleGetBA: handleGetBA,
	handleEditBA: handleEditBA,
	handleDeleteBA: handleDeleteBA,

	handleCreateMA: handleCreateMA,
	handleGetMA: handleGetMA,
	handleEditMA: handleEditMA,
	handleDeleteMA: handleDeleteMA,

	handleCreateNL: handleCreateNL,
	handleGetNL: handleGetNL,
	handleEditNL: handleEditNL,
	handleDeleteNL: handleDeleteNL,

	handleCreateKNL: handleCreateKNL,
	handleGetKNLdate: handleGetKNLdate,
	handleGetKNL: handleGetKNL,
	handleEditKNL: handleEditKNL,
	handleDeleteKNL: handleDeleteKNL,

	handleCreateHD: handleCreateHD,
	handleGetHD: handleGetHD,
	handleEditHD: handleEditHD,
	handleDeleteHD: handleDeleteHD,
	handleEditTTHD:handleEditTTHD,

	handleGetCTHD: handleGetCTHD,
};
