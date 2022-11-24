<template>
  <div
    ref="list"
    class="v-virtual-list"
    :style="{ height: `${selfContainerHeight}px` }"
    @scroll.passive="scrollHandler"
  >
    <div class="virtual__phantom" :style="{ height: placeholderHeight + 'px' }"></div>

    <div class="virtual__container" :style="{ transform }">
      <div
        class="item"
        :style="{ height: itemHeight + 'px' }"
        v-for="(item, index) in visibleList"
        :key="JSON.stringify(item)"
      >
        <slot v-bind:item="item" v-bind:index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
const clientHeight =
  (document.documentElement.clientHeight || document.body.clientHeight || 667) - 210

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: [Number],
      default: 50
    },
    containerHeight: {
      type: [Number],
      default: clientHeight
    }
  },
  data() {
    return {
      startOffset: 0,
      start: 0,
      selfList: this.list.slice()
    }
  },
  watch: {
    list() {
      this.selfList = this.list.slice()
    }
  },
  computed: {
    end() {
      return this.start + this.visibleCount + 5
    },
    selfContainerHeight() {
      return Math.min(this.containerHeight, clientHeight)
    },
    visibleList() {
      return this.selfList.slice(this.start, Math.min(this.end, this.selfList.length))
    },
    visibleCount() {
      return Math.ceil(this.selfContainerHeight / this.itemHeight)
    },
    transform() {
      return `translate3d(0, ${this.startOffset}px, 0)`
    },
    placeholderHeight() {
      return this.selfList.length * this.itemHeight
    }
  },
  methods: {
    scrollHandler() {
      const scrollTop = this.$refs.list.scrollTop
      this.start = Math.floor(scrollTop / this.itemHeight)
      if (this.end > this.selfList.length) {
        console.log('scroll-bottom')
        this.$emit('scroll-bottom')
      }
      this.startOffset = scrollTop - (scrollTop % this.itemHeight)
    }
  }
}
</script>

<style lang="less" scoped>
.v-virtual-list {
  position: relative;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .virtual__container {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    .item {
      margin-bottom: 24rpx;
    }
  }
}
</style>
