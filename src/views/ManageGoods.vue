<template>
  <div>
    <div style="display: flex;">
      <p style="font-size: 14px; color: #606266">搜索商品 :</p>
      <el-input
        v-model="searchGoods"
        placeholder="请输入要查找的商品名称"
        suffix-icon="el-icon-search"
        @keyup.enter.native="onSearch"
        style="width: 500px; padding-top: 3px; padding-left: 10px"
      ></el-input>
      <div style="padding-top: 3px; padding-left: 10px;">
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>

      <el-button type="success" @click="goAddGoods" style="right: 23px;position: absolute;">添加商品</el-button>
      <el-button type="info" @click="getGoodList" style="right: 125px;position: absolute;">查看所有</el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" min-width="80"></el-table-column>
      <el-table-column prop="goodsName" label="商品名" min-width="600px"></el-table-column>
      <el-table-column prop="goodsImg" label="商品图" width="150">
        <template slot-scope="scope">
          <el-popover placement="left" trigger="hover" width="300">
            <img :src="splitImgAddUrl(scope.row.goodsImg)" width="100%" />
            <img
              slot="reference"
              :src="splitImgAddUrl(scope.row.goodsImg)"
              style="max-height: 80px;max-width: 100px;"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="format" label="规格" min-width="120"></el-table-column>
      <el-table-column prop="goodsOP" label="原价 (元)" width="100"></el-table-column>
      <el-table-column prop="goodsPP" label="优惠 (元)" width="100"></el-table-column>
      <el-table-column prop="goodsDate" label="上货日期" width="150"></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑商品"
      :visible.sync="dialogFormVisible"
      width="45%"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="商品ID" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="format" :label-width="formLabelWidth">
          <el-input v-model="form.format"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="OP" :label-width="formLabelWidth">
          <el-input v-model.number="form.OP"></el-input>
        </el-form-item>
        <el-form-item label="优惠价" prop="PP" :label-width="formLabelWidth">
          <el-input v-model.number="form.PP"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoods,
  ImgUrl,
  updateGoods,
  deleteGoods,
  searchGoods
} from "../api/default";
export default {
  name: "ManageGoods",
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
      searchGoods: "",
      dialogFormVisible: false,
      tableData: [
        {
          no: "",
          goodsDate: "",
          goodsName: "",
          format: "",
          goodsImg: "",
          goodsOP: 0,
          goodsPP: 0
        }
      ],
      form: {
        id: "",
        name: "",
        format: "",
        OP: 0,
        PP: 0
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 10,
            max: 100,
            message: "标题不该少于 10 个字",
            trigger: "blur"
          }
        ],
        format: [
          { required: true, message: "请输入物品规格", trigger: "blur" }
        ],
        OP: [{ required: true, validator: checkOP, trigger: "blur" }],
        PP: [{ required: true, validator: checkPP, trigger: "blur" }]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    splitImgAddUrl(images) {
      let url = ImgUrl + images.split(",")[0];
      if (url === ImgUrl) {
        return;
      }
      // console.log("url, ", url);
      return url;
    },
    //Search
    onSearch() {
      console.log("onSearch: ", this.searchGoods);
      let data = { name: this.searchGoods };
      this.axios
        .post(searchGoods, data, {
          headers: {
            authorization: localStorage.getItem("token") //也是在本地中拿到token
          }
        })
        .then(res => {
          console.log("res: ", res);
          this.tableData = res.data.data;
          this.searchGoods = "";
        })
        .catch(e => {
          console.log("Search Error: ", e);
        });
    },
    //Table 操作
    handleEdit(index, row) {
      console.log("manage goods Edit: ", index, row);
      this.dialogFormVisible = true;
      console.log("row : ", row);
      this.form.id = row.no;
      this.form.name = row.goodsName;
      this.form.format = row.format;
      this.form.OP = row.goodsOP;
      this.form.PP = row.goodsPP;
    },
    handleDelete(index, row) {
      console.log("manage goods Delete: ", index, row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // let ;
          // console.log(data);
          this.axios
            .delete(
              deleteGoods,
              { data: { id: row.no } },
              {
                headers: {
                  authorization: localStorage.getItem("token") //也是在本地中拿到token
                }
              }
            )
            .then(resp => {
              console.log("delete Goods : ", resp);
              if (resp.data.errCode == 0) {
                this.$message({
                  type: "success",
                  message: resp.data.msg
                });
                this.getGoodList();
              } else {
                this.$message({
                  type: "error",
                  message: resp.data.msg
                });
              }
            })
            .catch(e => {
              console.log("Error: ", e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //Dialog
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    cancleDialog() {
      this.dialogFormVisible = false;
    },
    confirmDialog() {
      console.log("this.form: ", this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.axios
            .put(updateGoods, this.form, {
              headers: {
                authorization: localStorage.getItem("token") //也是在本地中拿到token
              }
            })
            .then(res => {
              console.log("update goods： ", res);
              this.dialogFormVisible = false;
              this.$message.success({
                message: res.data.msg
              });
              this.getGoodList();
            })
            .catch(e => {
              console.log("Update Goods Error: ", e);
            });
        } else {
          this.$message.info({
            message: "格式错误！"
          });
          return false;
        }
      });
    },
    getGoodList() {
      this.axios
        .get(getGoods, {
          headers: {
            authorization: localStorage.getItem("token") //也是在本地中拿到token
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
        })
        .catch(e => {
          console.log("getgoodsList error: ", e);
        });
    },
    //跳转到添加页面
    goAddGoods() {
      this.$router.push("/goods");
    }
  },
  mounted() {
    this.getGoodList();
  }
};
</script>

<style lang="scss" scoped>
</style>