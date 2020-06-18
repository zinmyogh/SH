<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="ID" label width="70"></el-table-column>
      <el-table-column prop="orderID" label="订单号" width="200"></el-table-column>
      <el-table-column prop="goodsName" label="商品名" min-width="250"></el-table-column>
      <el-table-column prop="goodsSize" label="规格" width="60"></el-table-column>
      <!-- <el-table-column prop="goodsPrice" label="单格" width="80"></el-table-column> -->
      <el-table-column prop="goodsImgs" label="商品图" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="40" height="40" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="orderAmount" label="订购数量(件)" width="120"></el-table-column>
      <el-table-column prop="orderPrice" label="订单金额(￥)" width="120"></el-table-column>
      <el-table-column prop="toName" label="收件人" width="100"></el-table-column>
      <el-table-column prop="toPhone" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="toAddress" label="收件地址" width="120"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleConfirmPost(scope.$index, scope.row)">确认并发单</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="isPost" label="发单" width="120"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ManageGoods",
  data() {
    return {
      tableData: [
        {
          ID: "8888",
          orderID: "20200625102022-dt0086TG",
          goodsName: "偶尔通过熬更让他风格， 爱上对方及饿哦软文推广加热闹",
          goodsSize: "1 x 15",
          //   goodsPrice: 39.0,
          orderAmount: 1,
          orderPrice: 39,
          toName: "李嘉诚",
          toPhone: "13100000000",
          toAddress: "这里这里，这里侄儿家，三环内",
          desc: "描述信息"
        }
        // {
        //   ID: "8888",
        //   orderID: "20200625102022-dt0086TG",
        //   goodsName: "偶尔通过熬更让他风格， 爱上对方及饿哦软文推广加热闹",
        //   goodsSize: "1 x 15",
        //   //   goodsPrice: 39.0,
        //   orderAmount: 1,
        //   orderPrice: 39,
        //   toName: "李嘉诚",
        //   toPhone: 13100000000 + "",
        //   toAddress: "这里这里，这里侄儿家，三环内",
        //   desc: "描述信息"
        // }
      ]
    };
  },
  methods: {
    //Table 操作
    handleConfirmPost(index, row) {
      console.log("manage goods Edit: ", index, row);
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
      this.dialogFormVisible = false;
      console.log("this.form: ", this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<!--<el-table-column prop="pictures" label="描述图片">
<template scope="scope">
<img v-for="item in scope.row.pictures" :src="item" width="40" height="40" class="head_pic"/>
</template>
</el-table-column>-->