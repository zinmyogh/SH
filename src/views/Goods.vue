<template>
  <div>
    <p style="color: #c00000; padding-left: 100px; font-weight: bold;">注：“轮播图” 必须选四张。“商品展示图” 一到十张。</p>
    <!--商品轮播图，限4张-->
    <div style="display: flex; padding-left: 35px">
      <p style="padding-right: 20px; font-size: 14px; color: #606266">轮播图</p>
      <el-upload
        action="/goodsCarousel"
        list-type="picture-card"
        ref="uploadGoodsPhotos"
        :limit="4"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :before-upload="handleBefore"
        :class="{hide: hideUpload}"
        :http-request="handleGoodsCarousel"
        multiple
        style="padding-bottom: 20px"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div class="goods">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
        class="goodsForm"
      >
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsForm.goodsName" placeholder="商品名称，以及商品介绍" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="goodsSize">
          <el-input v-model="goodsForm.goodsSize" placeholder="格式: 1 x 10 包" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="goodsOP">
          <el-input v-model.number="goodsForm.goodsOP" placeholder="商品价格. 请输入数字" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品优惠价" prop="goodsPP">
          <el-input v-model.number="goodsForm.goodsPP" placeholder="商品优惠. 请输入数字. 要减多少元."></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--商品Imglist， 限10张-->
    <div style="padding-bottom: 20px;display: flex;">
      <p style="padding-left: 10px;padding-right: 20px; font-size: 14px;color: #606266">商品展示图</p>
      <el-upload
        action="/goodsimgslist"
        list-type="picture-card"
        ref="uploadImgsList"
        :limit="15"
        :auto-upload="false"
        :on-preview="listPictureCardPreview"
        :on-remove="listRemove"
        :on-change="listChange"
        :before-upload="handleBefore"
        :class="{hid: hideListUpload}"
        :http-request="handleGoodsImgList"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div style="padding-left: 100px">
      <el-button type="primary" @click="uploadGoods()">上传商品</el-button>
      <el-button @click="resetForm('goodsForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
import { addGoodsCarousel, addGoodsImgList, addGoods } from "../api/default";
export default {
  data() {
    var checkOP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkPP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("优惠价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      hideListUpload: false,
      uploadLength: 0,
      uploadLimit: 4,
      limitCount: 4,
      goodsCaorousel: [],
      LuploadLength: 0,
      LuploadLimit: 15,
      LlimitCount: 15,
      goodsImgList: [],
      tableData: [
        {
          date: "2016-04-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1418 弄"
        }
      ],
      goodsForm: {
        goodsCarousel: "",
        goodsName: "",
        goodsSize: "",
        goodsOP: "",
        goodsPP: "",
        goodsImgList: ""
      },
      rules: {
        goodsName: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
          {
            min: 10,
            max: 100,
            message: "标题不该少于 10 个字",
            trigger: "blur"
          }
        ],
        goodsSize: [
          { required: true, message: "请输入物品规格", trigger: "blur" }
        ],
        goodsOP: [{ required: true, validator: checkOP, trigger: "blur" }],
        goodsPP: [{ required: true, validator: checkPP, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleGoodsCarousel(raw) {
      this.goodsCaorousel.push(raw.file);
    },
    handleGoodsImgList(raw) {
      this.goodsImgList.push(raw.file);
    },
    uploadGoods() {
      console.log("uploadGoods......");
      if (
        this.uploadLength !== 4 ||
        this.LuploadLength == 0 ||
        this.goodsForm.goodsName == "" ||
        this.goodsForm.goodsSize == "" ||
        this.goodsForm.goodsOP == "" ||
        this.goodsForm.goodsPP == ""
      ) {
        this.$message.info({
          message: "格式有误！！！"
        });
      } else {
        this.$refs.uploadGoodsPhotos.submit();
        let fd = new FormData();
        this.goodsCaorousel.forEach(function(file) {
          fd.append("file", file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
          //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        });
        this.axios
          .post(addGoodsCarousel, fd, {
            headers: {
              authorization: localStorage.getItem("token") //也是在本地中拿到token
            }
          })
          .then(res => {
            console.log(res);
            this.goodsForm.goodsCarousel = res.data.list;
            this.goodsCaorousel = [];
            this.$refs.uploadImgsList.submit();
            let fdl = new FormData();
            this.goodsImgList.forEach(function(file) {
              fdl.append("file", file, file.name);
            });
            this.axios
              .post(addGoodsImgList, fdl, {
                headers: {
                  authorization: localStorage.getItem("token") //也是在本地中拿到token
                }
              })
              .then(resp => {
                console.log("resp: ", resp);
                this.goodsForm.goodsImgList = resp.data.list;
                this.goodsImgList = [];
                let data = { data: this.goodsForm };
                console.log("goodsForm data: ", data);
                this.axios
                  .post(addGoods, data, {
                    headers: {
                      authorization: localStorage.getItem("token") //也是在本地中拿到token
                    }
                  })
                  .then(response => {
                    console.log("response: ", response);
                    if (response.data.errCode == 1) {
                      this.$message.error({
                        message: response.data.msg
                      });
                    } else {
                      this.$message.success({
                        message: response.data.msg
                      });
                      this.$refs.goodsForm.resetFields();
                      this.$refs.uploadGoodsPhotos.clearFiles();
                      this.$refs.uploadImgsList.clearFiles();
                      this.uploadLength = 0;
                      this.LuploadLength = 0;
                      this.hideUpload = false;
                      this.goodsCaorousel = [];
                      this.goodsImgList = [];
                    }
                  });
              })
              .catch(e => {
                this.goodsImgList = [];
                console.log("resp error:  ", e);
              });
          })
          .catch(e => {
            this.goodsCaorousel = [];
            console.log(e);
          });
      }
    },
    //轮播
    handleRemove(file, fileList) {
      console.log("Remove: ", file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadLength -= 1;
    },
    handlePictureCardPreview(file) {
      console.log("Preview>>>>");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      console.log("change : ", file, fileList);
      this.uploadLength = fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
    },
    handleBefore(file) {
      console.log("before Upload......");
      const isMatch =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isMatch) {
        this.$message.error("图片格式不匹配");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isMatch && isLt2M;
    },
    //表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.uploadGoodsPhotos.clearFiles();
      this.$refs.uploadImgsList.clearFiles();
      this.uploadLength = 0;
      this.LuploadLength = 0;
      this.hideUpload = false;
      this.goodsCaorousel = [];
      this.goodsImgList = [];
    },
    //List images
    listRemove(file, fileList) {
      console.log(" LISt Remove: ", file, fileList);
      this.hideListUpload = fileList.length == this.LlimitCount;
      this.LuploadLength -= 1;
    },
    listPictureCardPreview(file) {
      console.log(" lISt Preview>>>>");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    listChange(file, fileList) {
      console.log("LISt change : ", file, fileList);
      this.LuploadLength = fileList.length;
      this.LhideUpload = fileList.length == this.LlimitCount;
    }
  }
};
</script>

<style lang="scss">
.goods {
  width: 80%;
}
.hid .el-upload--picture-card {
  display: none;
}
</style>