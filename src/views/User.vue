<template>
  <div style=" display: flex; flex-direction: row; flex-wrap: wrap; position: relative;">
    <el-card shadow="hover" v-for="info in user" :key="info.id" style="position: relative;">
      <div class="user">
        <div class="avator">
          <img :src="info.profile" alt style="height: 80px" />
        </div>
        <div class="info">
          <div class="info_1">
            <div class="info_form">
              <span>ID :</span>
              <span>Username :</span>
              <span>Gender :</span>
              <span>City :</span>
              <span>Country :</span>
            </div>
            <div class="info_form_info">
              <span>{{info.no}}</span>
              <span>{{info.name}}</span>
              <span>{{filterSex(info.gender)}}</span>
              <span>{{info.city}}</span>
              <span>{{info.country}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAllUser } from "../api/default";
export default {
  name: "User",
  data() {
    return {
      user: [
        {
          no: "",
          name: "",
          gender: "",
          city: "",
          country: "",
          profile: ""
        }
      ]
    };
  },
  methods: {
    getUserList() {
      this.axios
        .get(getAllUser, {
          headers: {
            authorization: localStorage.getItem("token") //也是在本地中拿到token
          }
        })
        .then(res => {
          // console.log("user: ", res);
          if (res.data.errCode == 101 || res.data.errCode == 1) {
            this.$message.info({
              message: res.data.msg
            });
          } else {
            this.user = res.data.data;
          }

          // console.log("this.user: ", this.user);
        })
        .catch(e => {
          console.log("Error: ", e);
        });
    },
    filterSex(gender) {
      // console.log("123123123123");
      if (gender == 1) {
        return "Male";
      }
      return "Female";
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  // background-color: rgb(222, 222, 222);
  border-radius: 10px;
  width: 500px;
  .avator {
    width: 15%;
    position: relative;
    text-align: center;
    padding-right: 20px;
    padding-top: 10px;
  }
  .info {
    width: 85%;
    position: relative;
    display: flex;
    // border-left: 2px solid #dfdfdf;
    //   background-color: greenyellow;
    .info_1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      .info_form {
        display: flex;
        flex-direction: column;
        width: 180px;
        text-align: right;
        // background-color: greenyellow;
        span {
          padding: 5px;
          line-height: 23px;
          padding-left: 18px;
        }
      }
      .info_form_info {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;
        // background-color: violet;
        span {
          padding: 5px;
          height: 23px;
          padding-left: 20px;
          color: #606266;
          border-bottom: 0.5px dotted #dfdfdf;
        }
      }
      // background-color: aqua;
    }
  }
}
</style>