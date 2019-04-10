<template>
    <div class="introduction">
      <div class="introduction-content">
        <div class="title">
          <h1 class="">酒店简介</h1>
        </div>
        <div class="introduction-text">
          <pre>
              吉安国际酒店是集餐饮、旅业、会议、休闲娱乐为一体的吉安唯一涉外综合型商务酒店，酒店位于吉安县城庐陵大道庐陵
            广场旁，占地面积4.5万㎡，楼高54米，与庐陵文化广场、庐陵生态公园、国家4A级景点天祥公园毗邻，步行街、井冈山国
            家开发区仅需三分钟，距国家5A景区井冈山也仅需1小时，是您商务洽谈、旅游观光及居家休闲的梦幻天堂。酒店功能完善
            ，设有包括总统套房、豪华商务套房等各色客房297间，酒店拥有中餐厅、西餐厅、韩国餐厅、火锅餐厅四个不同风味的餐
            饮场所，就餐总座位数1600余位，另设有可接待500人的宴会厅、可容纳400人的国际会议中心以及夜总会、spa桑拿及足道
            、露天泳池、健身中心和网球场，可为宾客提供各式全新五星水准的酒店住宿、饮食、会议、康体和娱乐一体化的服务。
                另500多个车位的大型停车场，为宾客的出行提供了更多的便利。餐饮作为本酒店特色产品之一,菜式出品呈现多样
            化，能够满足宾客多样化饮食需求和高水准的服务要求,服务流程中体现“高科技”色彩,采以电脑化点菜系统,集合各
            地名师心得,着重丰富多彩的色、香、味、型,使用优质及造型优雅的器皿,借助器皿及盘饰的衬托,力显独具一格的饮食
            特色。酒店宴会厅的装饰高端大气结合本地区的人文环境,创作与众不同的中、大型社团宴会及中、西式婚宴制作,领跑
            本地宴会市场；纯正西式餐饮和韩国料理,吸引各籍人士及周边游客。酒店聘请香港知名酒店管理专家为您精心定制各项
            服务，一流的管理、一流的团队、一流服务、一流的配套一定将是您精彩人生的最佳驿站。
          </pre>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "introduction"
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.introduction
  position absolute

  width 100%
  height 100%

  background-color: skyblue
  .introduction-content
    .title
      height 30px
      width 60%
      margin-top 20px
      margin-left 20%
      //border silver solid 2px
      h1
        font-size 30px
    .introduction-text
      width 100%
      margin-top 50px
      //border silver solid 2px
      line-height  200%
    pre
      margin 0
      padding 0
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
      font-size 19.5px


</style>
