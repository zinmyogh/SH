<template>
  <div class="main-container">
    <!-- <TopAside /> -->
    <el-tabs
      v-if="editableTabs.length>0"
      v-model="editableTabsValue"
      type="border-card"
      closable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <component v-if="item.name" :is="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */

//账户管理
// import AccountManage from '@/pages/account-manage'

// import { mapState } from 'vuex'

export default {
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [],
      tabIndex: 0
    };
  },
  // computed: {
  //     ...mapState(['isSidebarNavCollapse'])
  // },
  mounted() {},

  components: {
    // TopAside,
    // AccountManage,
  },
  methods: {
    addTab(tab) {
      let result = this.editableTabs.find(item => {
        if (item.name === tab.name) {
          return true;
        }
      });
      if (result) {
        this.editableTabsValue = tab.name;
        return;
      }
      this.editableTabs.push({
        title: tab.title,
        name: tab.name
      });
      this.editableTabsValue = tab.name;
    },
    handleTabsEdit(targetName, action) {
      console.log("TabEdit: ", targetName, action);
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName); //除去当前tab
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
