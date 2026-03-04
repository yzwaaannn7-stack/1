const majorArcana = [
  ["愚者", "新起点、尝试、开放"],
  ["魔术师", "资源调动、执行、主动性"],
  ["女祭司", "观察、信息、内在判断"],
  ["皇后", "滋养、发展、现实成果"],
  ["皇帝", "结构、规则、边界"],
  ["教皇", "传统、学习、规范"],
  ["恋人", "选择、关系、价值一致"],
  ["战车", "推进、意志、方向控制"],
  ["力量", "稳定、耐心、柔性掌控"],
  ["隐士", "独立思考、复盘、沉淀"],
  ["命运之轮", "阶段变化、节奏、外部变量"],
  ["正义", "平衡、责任、结果对应"],
  ["倒吊人", "暂停、换位、重新评估"],
  ["死神", "结束与转化、更新"],
  ["节制", "整合、配比、长期优化"],
  ["恶魔", "束缚、依赖、现实欲求"],
  ["高塔", "突发变化、重建基础"],
  ["星星", "修复、希望、长期愿景"],
  ["月亮", "不确定、感受、信息混杂"],
  ["太阳", "清晰、活力、可见进展"],
  ["审判", "唤醒、总结、关键决定"],
  ["世界", "完成、整合、阶段闭环"],
];

const suitNames = ["权杖", "圣杯", "宝剑", "星币"];
const suitMeanings = {
  权杖: "行动、动力、执行",
  圣杯: "关系、情绪、连接",
  宝剑: "思维、判断、沟通",
  星币: "资源、落地、长期价值",
};

const rankNames = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "侍从", "骑士", "王后", "国王"];
const rankMeanings = {
  A: "开端与机会",
  2: "平衡与选择",
  3: "协作与扩展",
  4: "稳定与边界",
  5: "摩擦与调整",
  6: "修复与过渡",
  7: "策略与检验",
  8: "推进与专注",
  9: "阶段性成果",
  10: "周期收束",
  侍从: "学习与信息",
  骑士: "行动与变化",
  王后: "整合与支持",
  国王: "统筹与决策",
};

function buildDeck() {
  const deck = [];
  let id = 1;

  majorArcana.forEach(([name, meaning]) => {
    deck.push({ id, name, meaning, type: "大阿尔卡那" });
    id += 1;
  });

  suitNames.forEach((suit) => {
    rankNames.forEach((rank) => {
      deck.push({
        id,
        name: `${suit}${rank}`,
        meaning: `${suitMeanings[suit]}；${rankMeanings[rank]}`,
        type: "小阿尔卡那",
      });
      id += 1;
    });
  });

  return deck;
}

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawFourCards(deck) {
  const shuffled = shuffle(deck); // 每回合完整洗牌
  return shuffled.slice(0, 4);
}

function buildNeutralReading(question, cards) {
  const keywords = cards.map((c) => c.meaning.split("；")[0]).join("、");
  const cardFocus = cards.map((c) => `「${c.name}」强调${c.meaning}`).join("；");
  const questionText = question.trim() || "当前关注事项";

  return `问题：${questionText}。本次四牌显示的核心维度为：${keywords}。${cardFocus}。综合来看，建议先明确目标与限制条件，再按可执行步骤推进，并在过程中持续校对信息与资源匹配度。`;
}

const deck = buildDeck();
const drawBtn = document.querySelector("#drawBtn");
const questionInput = document.querySelector("#question");
const result = document.querySelector("#result");
const cardsEl = document.querySelector("#cards");
const roundInfoEl = document.querySelector("#roundInfo");
const readingEl = document.querySelector("#reading");

let round = 0;

drawBtn.addEventListener("click", () => {
  round += 1;
  const cards = drawFourCards(deck);

  roundInfoEl.textContent = `第 ${round} 回合：已完成 1-78 全量洗牌，并抽取 4 张牌。`;
  cardsEl.innerHTML = cards
    .map(
      (card, index) => `
      <article class="card">
        <h4>位置 ${index + 1}：${card.name}</h4>
        <p>编号：${card.id} / 类型：${card.type}</p>
        <p>基础牌意：${card.meaning}</p>
      </article>
    `
    )
    .join("");

  readingEl.textContent = buildNeutralReading(questionInput.value, cards);
  result.classList.remove("hidden");
});
