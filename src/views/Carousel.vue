<template>
  <div>
    <el-upload
      action="/as"
      list-type="picture-card"
      ref="uploadCarousel"
      :limit="5"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="handleBefore"
      :class="{hide: hideUpload}"
      :http-request="handleUpload"
      multiple
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <div style="padding-top: 10px">
      <el-button type="primary" @click="uploadCarousel">上传</el-button>
    </div>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="600">
        <template slot-scope="scope">
          <span v-for="item in splitImg(splitImgAddUrl(scope.row.list))" :key="item.id">
            <el-popover placement="left" trigger="hover" width="300">
              <img :src="item" width="100%" />
              <img
                slot="reference"
                :src="item"
                :alt="item"
                style="max-height: 70px;max-width: 70px; padding: 5px"
              />
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { upCarousel, getCarousel, ImgUrl, delCarousel } from "../api/default";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false, //图片5张时影藏上传框
      uploadLength: 0,
      uploadLimit: 5,
      limitCount: 5,
      files: [], //多图上传
      tableData: [{ id: "", createDate: "", list: "" }]
    };
  },
  methods: {
    splitImgAddUrl(images) {
      if (images == "" || images == undefined || images == null) {
        return "";
      } else {
        let arrImg = [];
        images.split(",").forEach(e => {
          arrImg.push(ImgUrl + e);
        });
        return arrImg.toString();
      }
    },
    splitImg(image) {
      if (image == undefined || image == "" || image == null) {
        return "";
      } else {
        return image.split(",");
      }
    },
    //实现多图同时上传
    handleUpload(raw) {
      this.files.push(raw.file);
    },
    //上传轮播图，多图同时上传，必须选择 5 张
    uploadCarousel() {
      console.log("uploadCarousel......");
      if (this.uploadLength !== 5) {
        this.$message.info({
          message: "请选择 5 张图片！"
        });
      } else {
        this.$refs.uploadCarousel.submit();
        let fd = new FormData();
        // fd.append("deptname", "技术部");
        this.files.forEach(function(file) {
          fd.append("file", file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
          //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        });
        this.axios
          .post(upCarousel, fd, {
            headers: {
              authorization: localStorage.getItem("token") //也是在本地中拿到token
            }
          })
          .then(res => {
            console.log("res ", res);
            if (res.data.errCode != 1) {
              this.$message.success({
                message: res.data.msg
              });
              this.files = [];
              this.$refs.uploadCarousel.clearFiles();
              this.hideUpload = false;
              this.gettingCarousel();
            } else {
              this.$message.error({
                message: res.data.msg
              });
            }
          });
      }
    },
    //从后端获取轮播图表
    gettingCarousel() {
      this.axios
        .get(getCarousel, {
          headers: {
            authorization: localStorage.getItem("token") //也是在本地中拿到token
          }
        })
        .then(resp => {
          console.log("get res: ", resp);
          this.tableData = resp.data.list;
          // console.log("this.tableData: ", this.tableData);
        });
    },
    //轮播, el-upload 的函数
    handleRemove(file, fileList) {
      // console.log("Remove: ", file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadLength -= 1;
    },
    handlePictureCardPreview(file) {
      // console.log("Preview>>>>");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList) {
      console.log("success", file, fileList);
    },
    handleChange(file, fileList) {
      // console.log("change : ", file, fileList);
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
    },
    handleBefore(file) {
      // console.log("before Upload......");
      const isMatch =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isMatch) {
        this.$message.error("图片格式不匹配");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isMatch && isLt2M;
    },
    //表格里的删除键
    handleDelete(index, row) {
      // console.log(index, row);
      const h = this.$createElement;
      this.$msgbox({
        title: "提示！",
        message: h("p", null, [
          h("span", null, `您确定要删除这些图吗？`),
          h("i", { style: "color: #c00000" }, "永久性操作，请慎重操作！")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          // console.log("11111111");
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let data = { id: row.id };
            // console.log("data:", data);
            this.axios
              .post(delCarousel, data, {
                headers: {
                  authorization: localStorage.getItem("token") //也是在本地中拿到token
                }
              })
              .then(resp => {
                console.log(resp);
                if (resp.data.errCode == 101) {
                  this.$message.info({
                    message: resp.data.msg
                  });
                } else if (resp.data.errCode == 0) {
                  instance.confirmButtonLoading = false;
                  this.$message.success({
                    message: resp.data.msg
                  });
                  this.gettingCarousel();
                }
                done();
                instance.confirmButtonLoading = false;
              })
              .catch(e => {
                console.log("Error: ", e);
              });
          } else {
            done();
          }
        }
      })
        .then(() => {})
        .catch(() => {
          this.$message.info({
            message: "已取消操作"
          });
        });
    }
  },
  mounted() {
    this.gettingCarousel();
  }
};
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>