const app = getApp()

// 引入系统预设卡组
const systemDecks = require('../../utils/systemDecks.js');

// 官方卡牌数据（用于复制）
const OFFICIAL_CARDS = {
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
    "说一个你不敢告诉父母的秘密"
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
    "展示一个瑜伽高难度动作"
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
    "邀请一个人跳一支舞"
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

// 构建卡组选项（包括4个基础卡组 + 10个主题卡组）
const buildSourceOptions = () => {
  const options = [
    { key: 'empty', name: '空白卡组', desc: '从零开始添加卡牌' },
    { key: 'statement', name: '真心话', icon: '💬', desc: `${OFFICIAL_CARDS.statement.length} 张卡牌` },
    { key: 'action', name: '大冒险', icon: '🎯', desc: `${OFFICIAL_CARDS.action.length} 张卡牌` },
    { key: 'interaction', name: '互动', icon: '🎭', desc: `${OFFICIAL_CARDS.interaction.length} 张卡牌` },
    { key: 'hell', name: '地狱', icon: '🔥', desc: `${OFFICIAL_CARDS.hell.length} 张卡牌` }
  ];
  // 添加10个主题卡组
  systemDecks.forEach(deck => {
    options.push({
      key: deck.id,
      name: deck.name,
      icon: deck.icon,
      desc: `${deck.cards.length} 张卡牌`
    });
  });
  return options;
};

Page({
  data: {
    isEdit: false,
    editIndex: -1,
    deckName: '',
    cardInput: '',
    cards: [],
    canSave: false,
    // 选择来源相关
    showSourcePicker: false,
    sourceOptions: buildSourceOptions()
  },

  onLoad(options) {
    if (options.edit && options.data) {
      // 编辑模式
      try {
        const deckData = JSON.parse(decodeURIComponent(options.data));
        this.setData({
          isEdit: true,
          editIndex: deckData.index,
          deckName: deckData.name,
          cards: deckData.cards || [],
          canSave: deckData.name.trim().length > 0 && (deckData.cards || []).length > 0
        });
        wx.setNavigationBarTitle({ title: '编辑卡组' });
      } catch (e) {
        wx.showToast({ title: '数据加载失败', icon: 'none' });
      }
    }
  },

  goBack() {
    wx.navigateBack();
  },

  /**
   * 监听卡组名称输入
   */
  onNameInput(e) {
    const name = e.detail.value;
    this.setData({
      deckName: name,
      canSave: name.trim().length > 0 && this.data.cards.length > 0
    });
  },

  /**
   * 监听卡牌输入
   */
  onCardInput(e) {
    this.setData({ cardInput: e.detail.value });
  },

  /**
   * 添加卡牌
   */
  addCard() {
    const card = this.data.cardInput.trim();
    if (!card) return;
    if (this.data.cards.length >= 100) {
      wx.showToast({ title: '最多100张', icon: 'none' });
      return;
    }
    this.setData({
      cards: [...this.data.cards, card],
      cardInput: '',
      canSave: this.data.deckName.trim().length > 0 && this.data.cards.length > 0
    });
  },

  /**
   * 删除卡牌
   */
  deleteCard(e) {
    const index = e.currentTarget.dataset.index;
    const cards = [...this.data.cards];
    cards.splice(index, 1);
    this.setData({
      cards,
      canSave: this.data.deckName.trim().length > 0 && cards.length > 0
    });
  },

  /**
   * 打开来源选择器
   */
  openSourcePicker() {
    this.setData({ showSourcePicker: true });
  },

  /**
   * 关闭来源选择器
   */
  closeSourcePicker() {
    this.setData({ showSourcePicker: false });
  },

  /**
   * 选择卡组来源
   */
  selectSource(e) {
    const key = e.currentTarget.dataset.key;
    
    if (key === 'empty') {
      this.setData({
        showSourcePicker: false,
        cards: []
      });
      return;
    }
    
    // 从官方卡组复制（4个基础分类）
    if (OFFICIAL_CARDS[key]) {
      this.setData({
        showSourcePicker: false,
        cards: [...OFFICIAL_CARDS[key]]
      });
      wx.showToast({
        title: `已复制 ${OFFICIAL_CARDS[key].length} 张卡牌`,
        icon: 'success'
      });
      return;
    }
    
    // 从主题卡组导入（追加到现有卡牌后面）
    const sourceDeck = systemDecks.find(d => d.id === key);
    if (sourceDeck) {
      this.setData({
        showSourcePicker: false,
        cards: [...this.data.cards, ...sourceDeck.cards]
      });
      wx.showToast({
        title: `已导入 ${sourceDeck.cards.length} 张卡牌`,
        icon: 'success'
      });
    }
  },

  /**
   * 保存卡组
   */
  saveDeck() {
    if (!this.data.canSave) return;

    const config = wx.getStorageSync('deckConfig') || {
      official: { statement: true, action: true, interaction: true, hell: true },
      custom: []
    };

    const newDeck = {
      id: Date.now().toString(),
      name: this.data.deckName.trim(),
      cards: this.data.cards,
      enabled: true,
      createdAt: new Date().toISOString()
    };

    if (this.data.isEdit && this.data.editIndex >= 0) {
      // 编辑现有卡组
      config.custom[this.data.editIndex] = newDeck;
    } else {
      // 新增卡组
      config.custom.push(newDeck);
    }

    wx.setStorageSync('deckConfig', config);

    wx.showToast({
      title: this.data.isEdit ? '保存成功' : '创建成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});