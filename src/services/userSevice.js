import db from "../models/index";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

require('dotenv').config

const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);
// hash Password
const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

const handleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!email || !password) {
				resolve({
					errCode: 1,
					message: "Vui lòng nhập đủ thông tin.",
				});
			} else {
				const isExist = await checkUserEmail(email);
				if (isExist) {
					const user = await db.nhanVien.findOne({
						// attributes:
						//     //define columns don't want
						//     // exclude: ['password'],
						//     //define columns want to show
						//     ['email', 'idChucVu', 'matKhau']
						// ,
						where: {email: email},
						raw: true,
					});
					const check = bcrypt.compareSync(password, user.matKhau);
					if (check) {
						delete user.matKhau;
						resolve({
							errCode: 0,
							message: "Đăng nhập thành công",
							user: user,
						});
					} else {
						resolve({
							errCode: 3,
							message: "Sai mật khẩu.",
						});
					}
				} else {
					resolve({
						errCode: 2,
						message: "Email không tồn tại.",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

const sendMail = async (email, code)=>{
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, 
		auth: {
		  user: 'hifive.tech.app@gmail.com', 
		  pass: 'nfmgiojgbjvqmihf', 
		},
	  });
	
	let info = await transporter.sendMail({
		from: '"No reply" noreply@gmail.com', 
		to: email, 
		subject: "Đổi mật khẩu tài khoản", 
		html: `<b>CODE: ${code}</b>`, 
	});
}

const handleUserForgot = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!email) {
				resolve({
					errCode: 1,
					message: "Vui lòng nhập đủ thông tin.",
				});
			} else {
				const user = await db.nhanVien.findOne({
					where: {email: email},
					raw: false,
				});
				if (user) {
					const token = Math.floor(10000 + Math.random() * 90000).toString();
					user.code = token;
					await user.save();
					sendMail(email, token);
					resolve({
						errCode: 0,
						message: "Mã thay đỗi mật khẩu đã được gửi tới email",
					});
				} else {
					resolve({
						errCode: 2,
						message: "Email không tồn tại.",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

const handleUserCheckCode = (email,code,password) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!email||!password||!code) {
				resolve({
					errCode: 1,
					message: "Vui lòng nhập đủ thông tin.",
				});
			} else {
				const user = await db.nhanVien.findOne({
					where: {email: email},
					raw: false,
				});
				if (user) {
					if (user.code==code) {
						const hashPasswordFromBcrypt = await hashUserPassword(password);
						user.code = "";
						user.matKhau = hashPasswordFromBcrypt;
						await user.save();
						resolve({
							errCode: 0,
							message: "Đỗi mật khẩu thành công",
						});
					}else{
						resolve({
							errCode: 3,
							message: "Sai mật mã",
						});
					}
				
				} else {
					resolve({
						errCode: 2,
						message: "Email không tồn tại.",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

const handleAdminLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!email || !password) {
				resolve({
					errCode: 1,
					message: "Vui lòng nhập đủ thông tin.",
				});
			} else {
				const isExist = await checkAdminEmail(email);
				if (isExist) {
					const user = await db.chuNhaHang.findOne({
						where: {email: email},
						raw: true,
					});
					const check = bcrypt.compareSync(password, user.matKhau);
					if (check) {
						delete user.matKhau;
						resolve({
							errCode: 0,
							message: "Đăng nhập thành công",
							user: user,
						});
					} else {
						resolve({
							errCode: 3,
							message: "Sai mật khẩu.",
						});
					}
				} else {
					const isExist = await checkUserEmail(email);
					if (isExist) {
						const user = await db.nhanVien.findOne({
							where: {email: email},
							raw: true,
						});
						const check = bcrypt.compareSync(password, user.matKhau);
						if (check) {
							delete user.matKhau;
							resolve({
								errCode: 0,
								message: "Đăng nhập thành công",
								user: user,
							});
						} else {
							resolve({
								errCode: 3,
								message: "Sai mật khẩu.",
							});
						}
					} else {
						resolve({
							errCode: 2,
							message: "Email không tồn tại.",
						});
					}


					// resolve({
					// 	errCode: 2,
					// 	message: "Email không tồn tại.",
					// });
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};
const checkAdminEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await db.chuNhaHang.findOne({
				where: {email: email},
			});
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};
const checkUserEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await db.nhanVien.findOne({
				where: {email: email},
			});
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

const getAllUsers = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";
			if (userId === "ALL") {
				users = await db.nhanVien.findAll({
					//define columns don't want
					attributes: {exclude: ["matKhau"]},
				});
			} else {
				if (Number(userId) === 111) {
					users = await db.chuNhaHang.findOne({
						attributes: {exclude: ["matKhau"]},
						where: {id: userId},
					});
				} else if (userId) {
					users = await db.nhanVien.findOne({
						attributes: {exclude: ["matKhau"]},
						where: {id: userId},
					});
				}
			}
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

const createNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkEmail = await checkUserEmail(data.email);
			if (checkEmail === true) {
				resolve({
					errCode: 1,
					message: "Email đã được sử dụng, vui lòng nhập email khác.",
				});
			} else {
				const hashPasswordFromBcrypt = await hashUserPassword(data.password);
				await db.nhanVien.create({
					email: data.email,
					matKhau: hashPasswordFromBcrypt,
					tenNV: data.fullName,
					soDT: data.phoneNumber,
					gioiTinh: data.gender,
					idChucVu: data.role,
				});
				resolve({
					errCode: 0,
					message: "Tạo tài khoản thành công",
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const updateUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : save()
			const user = await db.nhanVien.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (user) {
				user.tenNV = data.fullName || user.tenNV;
				user.soDT = data.phoneNumber || user.soDT;
				user.gioiTinh = data.gender || user.gioiTinh;
				user.idChucVu = data.roleId || user.idChucVu;
				await user.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy tài khoản`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteUser = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : destroy()
			const user = await db.nhanVien.findOne({
				where: {id: id},
				raw: false,
			});
			if (!user) {
				resolve({
					errCode: 2,
					message: `Người dùng không tồn tại`,
				});
			}
			await user.destroy();
			resolve({
				errCode: 0,
				message: "Xoá thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const deleteCV = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const cv = await db.chucVu.findOne({
				where: {id: id},
				raw: false,
			});
			if (!cv) {
				resolve({
					errCode: 2,
					message: `chức vụ không tồn tại`,
				});
			}
			await cv.destroy();
			resolve({
				errCode: 0,
				message: "Xoá chức vụ thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllCV = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allCV = await db.chucVu.findAll();
			if (allCV.length === 0) {
				resolve({
					errCode: 2,
					message: `Chức vụ trống`,
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: allCV,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const createNewCV = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.chucVu.create({
				tenChucVu: data.CV,
			});
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateCV = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : save()
			const cv = await db.chucVu.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (cv) {
				cv.tenChucVu = data.CV || cv.tenChucVu;
				await cv.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy chức vụ`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteDM = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const dm = await db.danhMucMA.findOne({
				where: {id: id},
				raw: false,
			});
			if (!dm) {
				resolve({
					errCode: 2,
					message: `Danh mục không tồn tại`,
				});
			}
			await dm.destroy();
			resolve({
				errCode: 0,
				message: "Xoá danh mục thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const getAllDM = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allDM = await db.danhMucMA.findAll();
			if (allDM.length === 0) {
				resolve({
					errCode: 2,
					message: `Danh mục trống`,
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: allDM,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
const createNewDM = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.danhMucMA.create({
				tenDanhMuc: data.DM,
			});
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateDM = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const dm = await db.danhMucMA.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (dm) {
				dm.tenDanhMuc = data.DM || dm.tenDanhMuc;
				await dm.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy danh mục`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteBA = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const ba = await db.banAn.findOne({
				where: {id: id},
				raw: false,
			});
			if (!ba) {
				resolve({
					errCode: 2,
					message: `chức vụ không tồn tại`,
				});
			}
			await ba.destroy();
			resolve({
				errCode: 0,
				message: "Xoá bàn ăn thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllBA = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allBA = await db.banAn.findAll();
			if (allBA.length === 0) {
				resolve({
					errCode: 2,
					message: `Bàn ăn trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: allBA,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const createNewBA = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.banAn.create({
				tenBanAn: data.BA,
				trangThaiBA: data.trangThaiBA,
			});
			resolve({
				errCode: 0,
				message: "Thêm bàn ăn thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateBA = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : save()
			const ba = await db.banAn.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (ba) {
				ba.tenBanAn = data.BA || ba.tenBanAn;
				ba.trangThaiBA = data.trangThaiBA ==0 ?data.trangThaiBA : (data.trangThaiBA || ba.trangThaiBA);
				await ba.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Bàn ăn không tồn tại`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteMA = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const ma = await db.monAn.findOne({
				where: {id: id},
				raw: false,
			});
			if (!ma) {
				resolve({
					errCode: 2,
					message: `Món ăn không tồn tại`,
				});
			}
			await ma.destroy();
			resolve({
				errCode: 0,
				message: "Xoá thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllMA = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allMA = await db.monAn.findAll();
			if (allMA.length === 0) {
				resolve({
					errCode: 2,
					message: `Món ăn trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: allMA,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const createNewMA = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.monAn.create({
				tenMonAn: data.MA,
				donGia: data.donGia,
				trangThai: data.trangThai,
				danhMuc: data.danhMuc,
				hinhAnh: data.hinhAnh,
			});
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateMA = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : save()
			const ma = await db.monAn.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (ma) {
				ma.tenMonAn = data.MA || ma.tenMonAn;
				ma.donGia = data.donGia || ma.donGia;
				ma.trangThai = data.trangThai == 0 ? data.trangThai : (data.trangThai || ma.trangThai);
				ma.hinhAnh = data.hinhAnh || ma.hinhAnh;
				ma.danhMuc = data.danhMuc || ma.danhMuc;
				await ma.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy món ăn`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteNL = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const nl = await db.nguyenLieu.findOne({
				where: {id: id},
				raw: false,
			});
			if (!nl) {
				resolve({
					errCode: 2,
					message: `Nguyên liệu không tồn tại`,
				});
			}
			await nl.destroy();
			resolve({
				errCode: 0,
				message: "Xoá thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllNL = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allNL = await db.nguyenLieu.findAll();
			if (allNL.length === 0) {
				resolve({
					errCode: 2,
					message: `Nguyên liệu trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: allNL,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const createNewNL = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.nguyenLieu.create({
				tenNguyenLieu: data.NL,
				donGia: data.donGia,
				donVi: data.donVi,
			});
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateNL = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// raw = false : save()
			const nl = await db.nguyenLieu.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (nl) {
				nl.tenNguyenLieu = data.NL || nl.tenNguyenLieu;
				nl.donGia = data.donGia || nl.donGia;
				nl.donVi = data.donVi || nl.donVi;
				await nl.save();
				resolve({
					errCode: 0,
					message: "Cập nhật thành công",
				});
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy nguyên liệu`,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteKNL = (arrId) => {
	return new Promise(async (resolve, reject) => {
		try {
			for (let index = 0; index < arrId.length; index++) {
				const knl = await db.khoNguyenLieu.findOne({
					where: {id: arrId[index]},
					raw: false,
				});
				if (!knl) {
					resolve({
						errCode: 2,
						message: `Không tồn tại`,
					});
				}
				await knl.destroy();
			}
			resolve({
				errCode: 0,
				message: "Xoá thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllKNL = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allKNL = await db.khoNguyenLieu.findAll();
			if (allKNL.length === 0) {
				resolve({
					errCode: 2,
					message: `Kho nguyên liệu trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK",
					data: allKNL,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const getKNL = (date) => {
	return new Promise(async (resolve, reject) => {
		try {
			const KNL = await db.khoNguyenLieu.findAll({where: {
				ngayNhap:{
							[Op.substring]: date
						  }
			}});
			if (KNL === null) {
				resolve({
					errCode: 2,
					message: `Kho nguyên liệu trống`,
					data: [],
				});
			}
			if (KNL.length === 0) {
				resolve({
					errCode: 2,
					message: `Kho nguyên liệu trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK ",
					data: KNL,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const createNewKNL = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			for (let index = 0; index < data.idNguyenLieu.length; index++) {
				await db.khoNguyenLieu.create({
					idNguyenLieu: data.idNguyenLieu[index],
					donVi: data.donVi[index],
					soLuongDauNgay: data.soLuongDauNgay[index],
					soLuongNhapTrongNgay: data.soLuongNhapTrongNgay[index],
					soLuongCuoiNgay: data.soLuongCuoiNgay[index],
					ngayNhap: data.ngayNhap,
					idNhanVien: data.idNhanVien,
				});
			}
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateKNL = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			for (let index = 0; index < data.id.length; index++) {
				const knl = await db.khoNguyenLieu.findOne({
					where: {id: data.id[index]},
					raw: false,
				});
				if (knl) {
					knl.soLuongDauNgay = data.soLuongDauNgay[index] == 0 ? data.soLuongDauNgay[index] : (data.soLuongDauNgay[index] || knl.soLuongDauNgay);
					knl.soLuongNhapTrongNgay = data.soLuongNhapTrongNgay[index] == 0 ? data.soLuongNhapTrongNgay[index] :(data.soLuongNhapTrongNgay[index] || knl.soLuongNhapTrongNgay);
					knl.soLuongCuoiNgay = data.soLuongCuoiNgay[index] == 0 ? data.soLuongCuoiNgay[index] : (data.soLuongCuoiNgay[index]|| knl.soLuongCuoiNgay);
					knl.donVi = data.donVi[index] || knl.donVi;
					knl.ngayNhap = data.ngayNhap || knl.ngayNhap;

					await knl.save();
				} else {
					resolve({
						errCode: 1,
						message: `Không tìm thấy`,
					});
				}
			}
			resolve({
				errCode: 0,
				message: "Cập nhật thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const createNewHD = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const hd = await db.hoaDon.create({
				tenKhachHang: data.tenKhachHang,
				idNhanVien: data.idNhanVien,
				idBanAn: data.idBanAn,
				chiPhiKhac: data.chiPhiKhac,
				giamGia: data.giamGia,
				ngayNhap: data.ngayNhap,
				trangThaiHD: parseInt(data.trangThaiHD),
				tongTien: data.tongTien,
			});
			if(data.idMonAn.length > 0 ){
				for (let index = 0; index < data.idMonAn.length; index++) {
					await db.chiTietHD.create({
						idHoaDon: hd.dataValues.id,
						idMonAn: data.idMonAn[index],
						soLuong: data.soLuong[index],
						thanhTien: data.thanhTien[index],
						ngayNhap: data.ngayNhap,
					});
				}
			}
			if(data.trangThaiHD == 0){
				const ba = await db.banAn.findOne({	
					where: {id: hd.idBanAn},
					raw: false,})
				ba.trangThaiBA = 1
				await ba.save()
			}
			resolve({
				errCode: 0,
				message: "Thêm thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const getAllHD = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allKNL = await db.hoaDon.findAll();
			if (allKNL.length === 0) {
				resolve({
					errCode: 2,
					message: `Hoá đơn trống`,
					data: [],
				});
			} else {
				resolve({
					errCode: 0,
					message: "OK",
					data: allKNL,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
const deleteHD = (arrId) => {
	return new Promise(async (resolve, reject) => {
		try {
			
			const knl = await db.hoaDon.findOne({
				where: {id: arrId},
				raw: false,
			});
			if(knl.trangThaiHD == 0){
				const ba = await db.banAn.findOne({	
					where: {id: knl.idBanAn},
					raw: false,})
				ba.trangThaiBA = 0
				await ba.save()
			}
			if (!knl) {
				resolve({
					errCode: 2,
					message: `Hoá đơn Không tồn tại`,
				});
			}
			const chiTietHD = await db.chiTietHD.findAll({
				where: {idHoaDon: arrId},
				raw: false,
			});
			if(chiTietHD.length>0){
				for (let index = 0; index < chiTietHD.length; index++) {
					await chiTietHD[index].destroy();
				}
			}
			await knl.destroy();
			resolve({
				errCode: 0,
				message: "Xoá thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateHD = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const knl = await db.hoaDon.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (knl) {
				const ba = await db.banAn.findOne({
					where: {id: data.idBanAn},
					raw: false,
				});

				const cthh = await db.chiTietHD.findAll({
					where: {idHoaDon: data.id},
					raw: false,
				});
				if(cthh?.length>0){
					for (let index = 0; index < cthh.length; index++) {
						await cthh[index].destroy();
					}
				}
				if(data.idMonAn.length > 0 ){
					for (let index = 0; index < data.idMonAn.length; index++) {
						await db.chiTietHD.create({
							idHoaDon: data.id,
							idMonAn: data.idMonAn[index],
							soLuong: data.soLuong[index],
							thanhTien: data.thanhTien[index],
							ngayNhap: data.ngayNhap,
						});
					}
				}
				if(knl.trangThaiHD == 0){
					if(data.trangThaiHD == 0){
						ba.trangThaiBA = 1
					} else {
						ba.trangThaiBA = 0
					}
				}else{
					if(data.trangThaiHD == 1){
						ba.trangThaiBA = 0
					} else {
						ba.trangThaiBA = 1
					}
				}
				await ba.save();
				knl.idBanAn = data.idBanAn
				knl.ngayNhap = data.ngayNhap
				knl.tenKhachHang = data.tenKhachHang
				knl.chiPhiKhac = data.chiPhiKhac == 0 ? data.chiPhiKhac : (data.chiPhiKhac|| knl.chiPhiKhac);
				knl.giamGia = data.giamGia == 0 ? data.giamGia : (data.giamGia|| knl.giamGia);
				knl.tongTien = data.tongTien == 0 ? data.tongTien : (data.tongTien|| knl.tongTien);
				knl.trangThaiHD = data.trangThaiHD == 0 ? data.trangThaiHD : (data.trangThaiHD|| knl.trangThaiHD);
				await knl.save();
				
				
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy`,
				});
			}
			resolve({
				errCode: 0,
				message: "Cập nhật thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateTTHD = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const knl = await db.hoaDon.findOne({
				where: {id: data.id},
				raw: false,
			});
			if (knl) {
				const ba = await db.banAn.findOne({
					where: {id: knl.idBanAn},
					raw: false,
				});
				ba.trangThaiBA = 0
				knl.trangThaiHD = data.trangThaiHD = 1 
				await ba.save();
				await knl.save();
			} else {
				resolve({
					errCode: 1,
					message: `Không tìm thấy`,
				});
			}
			resolve({
				errCode: 0,
				message: "Thanh toán thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};
const getCTHD = (idHoaDon) => {
	return new Promise(async (resolve, reject) => {
		try {
			const KNL = await db.chiTietHD.findAll({
				where: {idHoaDon: idHoaDon},
				raw: false
			});
			if (KNL === null) {
				resolve({
					errCode: 2,
					message: `Chi tiết hoá đơn trống`,
					data: [],
				});
			}
			if (KNL.length === 0) {
				resolve({
					errCode: 2,
					message: `Chi tiết hoá đơn trống`,
					data: [],
				});
			} else {
				for (let index = 0; index < KNL.length; index++) {
					const ma = await db.monAn.findOne({
						where: {id: KNL[index].idMonAn},
						raw: false
					});
					KNL[index].dataValues.DG = ma.donGia
				}
				resolve({
					errCode: 0,
					message: "OK ",
					data: KNL,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
	createNewUser: createNewUser,
	updateUser: updateUser,
	deleteUser: deleteUser,

	handleUserForgot: handleUserForgot,
	handleUserCheckCode:handleUserCheckCode,
	handleAdminLogin: handleAdminLogin,

	getAllCV: getAllCV,
	deleteCV: deleteCV,
	createNewCV: createNewCV,
	updateCV: updateCV,

	getAllDM: getAllDM,
	deleteDM: deleteDM,
	createNewDM: createNewDM,
	updateDM: updateDM,

	getAllBA: getAllBA,
	deleteBA: deleteBA,
	createNewBA: createNewBA,
	updateBA: updateBA,

	getAllMA: getAllMA,
	deleteMA: deleteMA,
	createNewMA: createNewMA,
	updateMA: updateMA,

	getAllNL: getAllNL,
	deleteNL: deleteNL,
	createNewNL: createNewNL,
	updateNL: updateNL,

	getAllKNL: getAllKNL,
	getKNL: getKNL,
	deleteKNL: deleteKNL,
	createNewKNL: createNewKNL,
	updateKNL: updateKNL,

	getAllHD: getAllHD,
	deleteHD: deleteHD,
	createNewHD: createNewHD,
	updateHD: updateHD,
	updateTTHD:updateTTHD,

	getCTHD: getCTHD,
};
