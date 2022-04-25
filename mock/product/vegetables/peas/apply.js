import a1 from '@/assets/images/product/vegetables/peas/apply/a1.jpg';
import a2 from '@/assets/images/product/vegetables/peas/apply/a2.jpg';

import p10 from '@/assets/images/product/logo/vegetables/qiezi.svg';
import p14 from '@/assets/images/product/logo/vegetables/xiancai.svg';

const data = {
  content: [
    {
      image: a1,
      alt: '黑奶奶',
      height: 728,
      imageWidth: 712,
      imageHeight: 712,
      title: '黑奶奶',
      desc: '花簇球形，直径5~15毫米，雄花和雌花混生；苞片及小苞片卵状披针形，长2.5~3毫米，透明，顶端有长芒尖，背面具绿色或红色隆起中脉；苋菜花被片矩圆形，长3~4毫米，绿色或黄绿色，顶端有长芒尖，背面具绿色或紫色隆起中脉；雄蕊比花被片长或短。胞果卵状矩圆形，长2~2.5毫米，环状横裂，包裹在宿存花被片内。',
      buttonText: '联系我们',
      href: '/banana.html',
      solutions: [
        '苋菜喜温暖，较耐热，温暖湿润的气候条件对苋菜的生长发育最为有利',
        '时发芽和出苗均受影响。苋菜不耐寒，生长中遇 0℃',
        '低温就受冻死亡，温度低于10℃植株生长缓慢 ， 最适生长温度为23~27℃，超过35℃时',
      ],
      products: [
        {
          name: '茄子',
          icon: p10,
          key: 'eggplant',
          alt: '大葱',
          href: '/product/vegetables/eggplant.html',
        },
      ],
    },
    {
      image: a2,
      alt: '豌豆射手',
      height: 728,
      imageWidth: 712,
      imageHeight: 712,
      title: '豌豆射手',
      desc: '是指通过一定的方法措施，躲避因为雷电而产生的对人体、建筑等的危害。雷电是一种自然放电现象。雷击是自然灾害，不仅会造成设备、房屋设施的损坏，而且可能引起火灾、爆炸，甚至还可能伤害人、畜等。避区栽种。',
      buttonText: '申请试用',
      href: '/banana.html',
      solutions: [
        '即我们通常所说的闪电。直击雷具有热效应',
        '雷云形成过程中，由于雷云中电荷的聚积',
        '且雷电能量巨大，可瞬间造成被击物折损、坍塌等物理损坏和电击损',
      ],
      products: [
        {
          name: '苋菜',
          icon: p14,
          key: 'amaranthus',
          alt: '苋菜',
          href: '/product/vegetables/amaranthus.html',
        },
      ],
    },
  ],
};

export default data;
