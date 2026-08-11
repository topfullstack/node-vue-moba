<template>
  <div>
    <h1>广告位列表</h1>
    <resource-search v-model="query" @search="fetch"></resource-search>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ResourceSearch from "../components/ResourceSearch.vue";

export default {
  components: {
    ResourceSearch
  },
  data() {
    return {
      query: "",
      items: []
    };
  },
  methods: {
    async fetch(query = this.query) {
      this.query = query;
      const res = await this.$http.get("rest/ads", {
        params: { q: query || undefined }
      });
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
