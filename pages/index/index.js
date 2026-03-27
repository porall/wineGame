// 卡牌数据
const CARD_DATA = {
  statement: [
    "讲一个你最尴尬的事",
    "分享一件你最近开心的事",
    "说一个你最讨厌的人",
    "分享一个你的小秘密",
    "讲一件你最难忘的事",
    "说一个你最崇拜的人",
    "分享一个你的梦想",
    "讲一件你最后悔的事",
    "说一个你最害怕的东西",
    "分享一个你的小习惯",
    "说一件你小时候的糗事",
    "分享一次你\"社死\"的瞬间",
    "讲一次你被骗的经历",
    "说一个你身上的怪癖",
    "分享一次你暗恋的经历",
    "讲一件让你泪崩的小事",
    "说一个你最近的小确幸",
    "分享一次你中奖的经历",
    "讲一件你为自己感到骄傲的事",
    "说一个你不敢告诉父母的秘密",
    "分享一次你印象最深刻的旅行",
    "讲一件你做过最勇敢的事",
    "说一个你最近学会的新技能",
    "分享一次你看到的暖心瞬间",
    "讲一件你童年最快乐的事",
    "说一个你最近的小烦恼",
    "分享一次你与家人难忘的过节经历",
    "讲一件你为朋友做的感动的事",
    "说一个你最近的新发现",
    "分享一次你心跳加速的瞬间"
  ],
  action: [
    "站起来喝酒",
    "做10个俯卧撑",
    "模仿一个动物",
    "唱一首歌",
    "跳一段舞",
    "做一个鬼脸",
    "学婴儿哭",
    "表演一个魔术",
    "用鼻子画圈",
    "单脚站立10秒",
    "做5个蛙跳",
    "用屁股写自己的名字",
    "对着窗外大喊\"我是最美的\"",
    "原地转10圈后走直线",
    "模仿一位在场的玩家",
    "用奇怪的声音读一段台词",
    "表演\"一秒钟内变脸\"",
    "做一套广播体操",
    "模仿一段经典电影台词",
    "展示一个瑜伽高难度动作",
    "闭眼金鸡独立30秒",
    "用嘴接住抛起的零食",
    "表演\"中彩票\"后的反应",
    "倒唱一首儿歌",
    "用肢体表演一个成语",
    "学模特走猫步绕场一周",
    "表演\"触电\"的感觉",
    "一口气说一段绕口令",
    "不用手，吃掉放在额上的饼干",
    "表演\"手机没信号\"的焦急状态"
  ],
  interaction: [
    "和左边的人碰杯",
    "给右边的人讲个笑话",
    "和对面的人击掌",
    "对旁边的人说我爱你",
    "和全场的人碰杯",
    "给一个人按摩肩膀",
    "和旁边的人拥抱",
    "对一个人做飞吻",
    "和一个人猜拳",
    "给一个人倒酒",
    "喂左边的人吃一口东西",
    "和右边的人喝交杯酒",
    "夸赞对面的人三个优点",
    "选择一个异性，进行深情对视10秒",
    "与左边的人合作表演一个节目",
    "对右边的人说一句真心话",
    "帮一个人整理头发或衣着",
    "和一个人十指相扣唱情歌",
    "选择一个异性，说一段土味情话",
    "邀请一个人跳一支舞",
    "和左边的人玩\"你画我猜\"",
    "对右边的人进行一次\"采访\"",
    "与对面的人分享一个秘密",
    "给一个人深情一吻（部位自选）",
    "和一个人自拍并做鬼脸",
    "选择一个异性，背对背挤爆气球",
    "对左边的人说\"你好讨厌\"",
    "和右边的人交头接耳传一句话",
    "给一个人公主抱（或被抱）",
    "邀请一个人共同完成下个大冒险"
  ],
  hell: [
    "喝完一杯酒",
    "连续喝三杯酒",
    "表演一个性感的舞蹈",
    "打电话给前任",
    "在群里发一个红包",
    "裸着上身跳舞",
    "喝一杯混合酒",
    "对服务员说我爱你",
    "在地上打滚",
    "表演吃辣椒比赛",
    "干喝一杯柠檬汁",
    "吃一片沾满芥末的面包",
    "对着楼下大喊\"我好寂寞\"",
    "发表1分钟分手感言",
    "跳一段钢管舞",
    "用微信状态表白一位异性",
    "喝一杯\"特调\"饮料",
    "录一段鬼畜视频发朋友圈",
    "秀出你的肚腩或腹肌",
    "对通讯录第3位说\"我想你\""
  ]
};

// 官方卡组分类信息
const OFFICIAL_CATEGORIES = [
  { key: 'statement', name: '真心话', icon: '💬', color: '#ff6b9d' },
  { key: 'action', name: '大冒险', icon: '🎯', color: '#ffa502' },
  { key: 'interaction', name: '互动', icon: '🎭', color: '#2ed573' },
  { key: 'hell', name: '地狱', icon: '🔥', color: '#ff4757' }
];

// 默认卡组配置
const DEFAULT_DECK_CONFIG = {
  official: {
    statement: true,
    action: true,
    interaction: true,
    hell: true
  },
  custom: []
};

Page({
  data: {
    selectedCategory: 'statement',
    currentCard: '',
    cardSource: '', // 当前抽到的卡牌来源
    isCardVisible: false,
    isCardShaking: false,
    isDrawing: false,
    cards: CARD_DATA,
    // 卡组管理相关
    deckConfig: DEFAULT_DECK_CONFIG,
    isDeckPanelVisible: false,
    deckPanelTab: 'official', // official / custom
    // 统计信息
    enabledCount: {
      official: 4,
      custom: 0
    }
  },

  particles: [],
  ctx: null,
  canvasWidth: 0,
  canvasHeight: 0,
  animationFrame: null,
  isAnimating: false,

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    // 加载卡组配置
    this.loadDeckConfig();
    
    // 延迟初始化canvas，确保DOM已渲染
    setTimeout(() => {
      this.initCanvas();
    }, 500);
  },

  onShow() {
    // 每次显示时重新加载配置（可能有新增/编辑的卡组）
    this.loadDeckConfig();
    
    if (this.ctx) {
      this.startAnimation();
    }
  },

  onHide() {
    this.stopAnimation();
  },

  onUnload() {
    this.stopAnimation();
  },

  // 加载卡组配置
  loadDeckConfig() {
    const config = wx.getStorageSync('deckConfig');
    if (config) {
      this.setData({ deckConfig: config });
    } else {
      // 初始化默认配置
      this.saveDeckConfig(DEFAULT_DECK_CONFIG);
    }
    this.updateEnabledCount();
  },

  // 保存卡组配置
  saveDeckConfig(config) {
    wx.setStorageSync('deckConfig', config);
    this.setData({ deckConfig: config });
    this.updateEnabledCount();
  },

  // 更新启用数量统计
  updateEnabledCount() {
    const config = this.data.deckConfig;
    let officialCount = 0;
    let customCount = 0;
    
    // 统计官方卡组
    Object.keys(config.official).forEach(key => {
      if (config.official[key]) officialCount++;
    });
    
    // 统计自定义卡组
    config.custom.forEach(deck => {
      if (deck.enabled) customCount++;
    });
    
    this.setData({
      enabledCount: {
        official: officialCount,
        custom: customCount
      }
    });
  },

  // 获取所有启用的卡牌
  getAllEnabledCards() {
    const config = this.data.deckConfig;
    const allCards = [];
    
    // 添加官方卡组
    Object.keys(config.official).forEach(key => {
      if (config.official[key] && CARD_DATA[key]) {
        CARD_DATA[key].forEach(card => {
          allCards.push({ source: 'official', category: key, content: card });
        });
      }
    });
    
    // 添加自定义卡组
    config.custom.forEach(deck => {
      if (deck.enabled && deck.cards) {
        deck.cards.forEach(card => {
          allCards.push({ source: 'custom', deckName: deck.name, content: card });
        });
      }
    });
    
    return allCards;
  },

  // 打开卡组管理面板
  openDeckPanel() {
    this.setData({ isDeckPanelVisible: true });
  },

  // 关闭卡组管理面板
  closeDeckPanel() {
    this.setData({ isDeckPanelVisible: false });
  },

  // 切换面板 Tab
  switchDeckTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ deckPanelTab: tab });
  },

  // 切换官方卡组开关
  toggleOfficial(e) {
    const category = e.currentTarget.dataset.category;
    const config = this.data.deckConfig;
    config.official[category] = !config.official[category];
    this.saveDeckConfig(config);
  },

  // 切换自定义卡组开关
  toggleCustom(e) {
    const index = e.currentTarget.dataset.index;
    const config = this.data.deckConfig;
    config.custom[index].enabled = !config.custom[index].enabled;
    this.saveDeckConfig(config);
  },

  // 删除自定义卡组
  deleteCustomDeck(e) {
    const index = e.currentTarget.dataset.index;
    const that = this;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个卡组吗？',
      success(res) {
        if (res.confirm) {
          const config = that.data.deckConfig;
          config.custom.splice(index, 1);
          that.saveDeckConfig(config);
        }
      }
    });
  },

  // 跳转新建卡组页面
  goToNewDeck() {
    wx.navigateTo({
      url: '/pages/new-deck/new-deck'
    });
  },

  // 编辑自定义卡组
  editCustomDeck(e) {
    const index = e.currentTarget.dataset.index;
    const deck = JSON.stringify(this.data.deckConfig.custom[index]);
    wx.navigateTo({
      url: `/pages/new-deck/new-deck?edit=true&data=${encodeURIComponent(deck)}`
    });
  },

  // 初始化Canvas
  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#partyCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          this.ctx = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          this.ctx.scale(dpr, dpr);
          
          this.canvasWidth = res[0].width;
          this.canvasHeight = res[0].height;
          
          // 初始化粒子
          this.initParticles(50);
          this.startAnimation();
        }
      });
  },

  // 初始化粒子
  initParticles(count) {
    this.particles = [];
    const colors = ['#ff6b9d', '#ffa502', '#2ed573', '#00d2ff', '#a55eea', '#ff4757'];
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2
      });
    }
  },

  // 开始动画
  startAnimation() {
    // 防止重复启动
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const animate = () => {
      if (!this.ctx) {
        this.isAnimating = false;
        return;
      }
      
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      
      // 绘制粒子
      this.particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.05;
        
        // 边界检测
        if (p.x < 0 || p.x > this.canvasWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > this.canvasHeight) p.speedY *= -1;
        
        // 绘制发光圆形
        const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = p.opacity + Math.sin(p.pulse) * 0.2;
        this.ctx.fill();
        
        // 绘制中心点
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = 1;
        this.ctx.fill();
      });
      
      // 绘制连接线
      this.particles.forEach((p1, i) => {
        this.particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        });
      });
      
      this.animationFrame = setTimeout(() => {
        if (this.isAnimating) {
          animate();
        }
      }, 16);
    };
    
    animate();
  },

  // 停止动画
  stopAnimation() {
    this.isAnimating = false;
    if (this.animationFrame) {
      clearTimeout(this.animationFrame);
    }
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    // 切换当前分类的启用状态
    const config = this.data.deckConfig;
    config.official[category] = !config.official[category];
    this.saveDeckConfig(config);
    
    this.setData({
      isCardVisible: false,
      currentCard: '',
      cardSource: ''
    });
  },

  drawCard() {
    if (this.data.isDrawing) {
      return;
    }

    // 获取所有启用的卡牌
    const allCards = this.getAllEnabledCards();
    
    if (allCards.length === 0) {
      wx.showToast({
        title: '请先启用卡组',
        icon: 'none'
      });
      return;
    }

    this.setData({
      isDrawing: true,
      isCardVisible: false
    });

    setTimeout(() => {
      // 从所有启用的卡牌中随机抽取
      const randomIndex = Math.floor(Math.random() * allCards.length);
      const randomCard = allCards[randomIndex];
      
      // 生成来源描述
      let sourceDesc = '';
      if (randomCard.source === 'official') {
        const cat = OFFICIAL_CATEGORIES.find(c => c.key === randomCard.category);
        sourceDesc = cat ? cat.name : '官方';
      } else {
        sourceDesc = randomCard.deckName || '自定义';
      }

      // 触发抽卡动画效果
      this.triggerDrawEffect();

      this.setData({
        currentCard: randomCard.content,
        cardSource: sourceDesc,
        isCardVisible: true,
        isCardShaking: true
      });

      setTimeout(() => {
        this.setData({
          isCardShaking: false,
          isDrawing: false
        });
      }, 600);
    }, 300);
  },

  // 抽卡时的特殊效果
  triggerDrawEffect() {
    // 给粒子添加爆发效果
    this.particles.forEach(p => {
      p.speedX = (Math.random() - 0.5) * 8;
      p.speedY = (Math.random() - 0.5) * 8;
    });
    
    // 1秒后恢复正常
    setTimeout(() => {
      this.particles.forEach(p => {
        p.speedX = (Math.random() - 0.5) * 2;
        p.speedY = (Math.random() - 0.5) * 2;
      });
    }, 1000);
  },

  onShareAppMessage() {
    return {
      title: '🎉 酒桌派对 - 让聚会嗨起来！',
      desc: '聚会必备神器，各种有趣的酒桌游戏等你来玩！',
      path: 'pages/index/index',
      imageUrl: '/images/logo.png'
    };
  },

  onShareTimeline() {
    return {
      title: '🎉 酒桌派对 - 让聚会嗨起来！',
      path: 'pages/index/index',
      imageUrl: '/images/logo.png'
    };
  }
});