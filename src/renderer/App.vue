<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div>
                    	<img src="https://vignette3.wikia.nocookie.net/logopedia/images/d/dd/NBA.png" style="width:15px; margin-left:18px; margin-top:6px" alt="" />
                    </div>
                    <Menu-item name="1">
                        <Icon type="arrow-right-b"></Icon>
                        <span class="layout-text">Accueil</span>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="arrow-right-b"></Icon>
                        <span class="layout-text">Stats</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">Accueil</Breadcrumb-item>
                        <Breadcrumb-item>Stats</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                    	<router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2017 &copy; Nba Board
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
  export default {
    name: 'nbaboard',
    data() {
      return {
        spanLeft: 5,
        spanRight: 19,
      };
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 13 : 24;
      },
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      },
    },
  };
</script>

<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
        height: 540px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
