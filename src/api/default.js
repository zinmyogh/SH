const BaseUrl = "http://192.168.0.116:3000/";

//登录
const Login = BaseUrl + "adminlogin";

//Image Url 的前缀
const ImgUrl = BaseUrl + "statics/";
//首页 Carousel
const upCarousel = BaseUrl + "addcarousel";
const getCarousel = BaseUrl + "getcarousel";
const delCarousel = BaseUrl + "deletecarousel";

//商品 Goods
const searchGoods = BaseUrl + "searchgoods";
const addGoodsCarousel = BaseUrl + "goodscarousel";
const addGoodsImgList = BaseUrl + "goodsimglist";
const getGoods = BaseUrl + "getgoods";
const addGoods = BaseUrl + "addgoods";
const updateGoods = BaseUrl + "updategoods";
const deleteGoods = BaseUrl + "deletegoods";

//用户列表
const getAllUser = BaseUrl + "getalluser";

module.exports = {
  Login,
  upCarousel,
  getCarousel,
  ImgUrl,
  delCarousel,
  searchGoods,
  addGoodsCarousel,
  addGoodsImgList,
  getGoods,
  addGoods,
  updateGoods,
  deleteGoods,
  getAllUser,
};
