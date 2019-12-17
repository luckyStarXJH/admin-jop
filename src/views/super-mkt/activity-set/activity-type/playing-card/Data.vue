<template>
  <div class="edit">
    <el-tabs v-model="activeName">
      <el-tab-pane label="活动数据" name="dataTable">
        <ActiveDataPage
          :activeDataVo="activeData"
          :chartData="chartData"
          @searchData="activeSearch"
        ></ActiveDataPage> 
      </el-tab-pane>
      <el-tab-pane label="参与记录" name="history">
        <HistoryDataPage :historyAllData="historyAllData" @searchData="historySearch"></HistoryDataPage>
      </el-tab-pane>
      <el-tab-pane label="中奖记录" name="winningNotes">
        <WinningNotesPage :winningAllData="winningAllData" @searchData="winningSearch"></WinningNotesPage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { imagesUrl } from '@/utils/imageUrl'
import ActiveDataPage from '@/views/super-mkt/activity-set/activity-type/set-template/view-data/ActiveData'
import HistoryDataPage from '@/views/super-mkt/activity-set/activity-type/set-template/view-data/HistoryData'
import WinningNotesPage from '@/views/super-mkt/activity-set/activity-type/set-template/view-data/WinningNotes'
import moment from 'moment'
import {
  joinRecords,
  dataShow,
  winningRecords
} from '@/api/super-mkt/activity-set/tiger'

export default {
  components: {
    ActiveDataPage,
    HistoryDataPage,
    WinningNotesPage
  },
  created() {
    this._getActiveData()
    this._getHistoryData()
    this._getWinningData()
  },
  data() {
    return {
      activeName: 'dataTable',
      activeData: {},
      chartData: {},
      historyAllData: {},
      winningAllData: {},
      activeId: this.$route.query.id
    }
  },
  methods: {
    winningSearch(options) {
      const params = Object.assign(options, {
        activeId: this.activeId,
        beginTime: options.winningTime[0] ? options.winningTime[0] : '',
        endTime: options.winningTime[1] ? options.winningTime[1] : ''
      })

      this._getWinningData(params)
    },
    async _getWinningData(options = { activeId: this.$route.query.id }) {
      try {
        const result = await winningRecords(options)
        result.data.list.forEach(item => {
          if (item.picList) {
            item.picURL = imagesUrl({
              name: item.picList[0]
            })
          }
        })
        this.winningAllData = result.data
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.log('TCL: _getHistoryData -> result', error)
      }
    },
    historySearch(options) {
      const params = Object.assign(options, {
        activeId: this.activeId,
        beginTime: options.winningTime[0] ? options.winningTime[0] : '',
        endTime: options.winningTime[1] ? options.winningTime[1] : ''
      })

      this._getHistoryData(params)
    },
    async _getHistoryData(options = { activeId: this.$route.query.id }) {
      try {
        const result = await joinRecords(options)
        this.historyAllData = result.data
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.log('TCL: _getHistoryData -> result', error)
      }
    },
    activeSearch(options) {
      this._getActiveData(options)
    },
    async _getActiveData(options = { activeId: this.$route.query.id }) {
      try {
        const result = await dataShow(options)
        const { activeDataVo, datas, shows } = result.data

        const joinPersonObj = {}
        const shareDataObj = {}

        datas.map(item => {
          joinPersonObj[item.createTime] = item.joinNumberSum
          shareDataObj[item.createTime] = item.shareNumberSum
        })

        const rows = shows.map(item => {
          return {
            日期: item.createTime,
            展示量: item.showNumberSum,
            参与人数: joinPersonObj[item.createTime]
              ? joinPersonObj[item.createTime]
              : 0,
            分享次数: shareDataObj[item.createTime]
              ? shareDataObj[item.createTime]
              : 0
          }
        })
        rows.reverse()
        this.chartData = {
          columns: ['日期', '展示量', '参与人数', '分享次数'],
          rows
        }

        this.activeData = activeDataVo
      } catch (error) {
        console.log('TCL: _getActiveData -> error', error)
      }
    }
  }
}
</script>


