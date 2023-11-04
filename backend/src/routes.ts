import { Router, Request, Response } from "express";
import multer from "multer";

import { isAutenticated } from "./middlewares/isAutenticated";


import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { CreateAccessController } from "./controllers/user/CreateAccessController";
import { ListAccessController } from "./controllers/user/ListAccessController";


import { CreateTableController } from "./controllers/table/CreateTableController";
import { RemoveTableController } from "./controllers/table/RemoveTableController";
import { ListTableController } from "./controllers/table/ListTableController";
import { ListAllTableController } from "./controllers/table/ListAllTableController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoverCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { ListProductReportController } from "./controllers/product/ListProductReportController";
import { UpdateProductController } from "./controllers/product/UpdateProductController";

import { ListOrderController } from "./controllers/order/ListOrderController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveOrderItemController } from "./controllers/order/RemoveOrderItemController";
import { ListOrderOpenController } from "./controllers/order/ListOrderOpenController";
import { ListOrderAttendanceController } from "./controllers/order/ListOrderAttendanceController";
import { ListOrderPreparedController } from "./controllers/order/ListOrderPreparedController";
import { ListOrderFinishController } from "./controllers/order/ListOrderFinishController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { ConcludedOrderController } from "./controllers/order/ConcludedOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ToAssesOrderController } from "./controllers/order/ToAssessOrderContoller";
import { CancelOrderController } from "./controllers/order/CancelOrderController";
import { UpdateOrderController } from "./controllers/order/UpdateOrderController";
import { CalcTotalITemController } from "./controllers/order/CalcTotalITemController";
import { CalcTotalOrderController } from "./controllers/order/CalcTotalOrderController";
import { ListItemOrderController } from "./controllers/order/ListItemOrderController";

import uploadConfig from './config/multer';
import { ListOrderCancelController } from "./controllers/order/ListOrderCancelController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";




const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Permissions



//--Roatas Users --
router.post('/users',isAutenticated(["Administrador"]), new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/detail', isAutenticated(["Cozinha", "Administrador"]), new DetailUserController().handle)
router.get('/users/list', isAutenticated(["Administrador"]), new ListUserController().handle)
router.delete('/users', isAutenticated(["Administrador"]), new DeleteUserController().handle)
router.post('/access',isAutenticated(["Administrador"]), new CreateAccessController().handle)
router.get('/access/list', isAutenticated(["Administrador"]), new ListAccessController().handle)


//--Rotas Table --
router.post('/table', isAutenticated(["Administrador"]), upload.single('file'), new CreateTableController().handle)
router.get('/table/list', isAutenticated(["Cozinha", "Administrador"]), new ListTableController().handle)
router.get('/table/list/all', isAutenticated(["Administrador", "Cozinha"]), new ListAllTableController().handle)
router.delete('/table', isAutenticated(["Administrador"]), new RemoveTableController().handle)


//--Rotas Category --
router.post('/category', isAutenticated(["Administrador"]), new CreateCategoryController().handle)
router.get('/listcategory', new ListCategoryController().handle)
router.delete('/category', isAutenticated(["Administrador"]), new RemoveCategoryController().handle)

//--Rotas Product --
router.post('/product', isAutenticated(["Administrador"]), upload.single('file'), new CreateProductController().handle)
router.get('/product/list', new ListProductController().handle)
router.delete('/product', isAutenticated(["Administrador"]), new RemoveProductController().handle)
router.get('/products/report', new ListProductReportController().handle)
router.put('/product', new UpdateProductController().handle)

//--Rotas Order --
router.post('/order', new CreateOrderController().handle)
router.delete('/order', new RemoveOrderController().handle)
router.post('/order/add', new AddItemController().handle)
router.delete('/order/remove', new RemoveOrderItemController().handle)
router.put('/order/send', new SendOrderController().handle)
router.get('/order/list/open', isAutenticated(["Cozinha", "Administrador"]), new ListOrderOpenController().handle)
router.get('/order/list/attendance', isAutenticated(["Cozinha", "Administrador"]), new ListOrderAttendanceController().handle)
router.get('/order/list/prepared', isAutenticated(["Cozinha", "Administrador"]), new ListOrderPreparedController().handle)
router.get('/order/list/finish', isAutenticated(["Cozinha", "Administrador"]), new ListOrderFinishController().handle)
router.get('/order/list', new ListOrderController().handle)
router.get('/order/list/item', new ListItemOrderController().handle)
router.get('/order/detail', isAutenticated(["Cozinha", "Administrador"]), new DetailOrderController().handle)
router.get('/order/list/cancel', isAutenticated(["Cozinha", "Administrador"]), new ListOrderCancelController().handle)
router.put('/order/concluded', new ConcludedOrderController().handle)
router.put('/order/finish',  new FinishOrderController().handle)
router.put('/order/assessment', new ToAssesOrderController().handle)
router.put('/order/cancel', new CancelOrderController().handle )
router.put('/order/add/update', new UpdateOrderController().handle)
router.put('/order/add', new CalcTotalITemController().handle)
router.put('/order', new CalcTotalOrderController().handle)

export { router }