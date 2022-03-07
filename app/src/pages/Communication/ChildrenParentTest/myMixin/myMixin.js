//  vue中提供的混入mixin方法可以传入各种共用的配置方法，方便重复调用
export default {
  //  对外暴露的对象，可以放置组件重复JS业务逻辑
  methods: {
    //  给钱
    geiQian(num) {
      this.money -= num;
      this.$parent.money += num;
    },
  },
  mounted() {
    console.log(`子组件加载了`);
  },
};
