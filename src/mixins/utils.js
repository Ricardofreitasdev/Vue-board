const utils = {
  data() {
    return {
      windowWidth: window.innerWidth,
      mobileBreakpoint: 600,
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < this.mobileBreakpoint;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};

export default utils;
