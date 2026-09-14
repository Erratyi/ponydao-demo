import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Briefcase,
  CaretDown,
  ChartBar,
  CheckCircle,
  Clock,
  Coins,
  Cube,
  FileText,
  Gear,
  Globe,
  Handshake,
  List,
  MagnifyingGlass,
  SignOut,
  Sparkle,
  Target,
  UserCircle,
  Users,
  Wallet,
  X,
} from "@phosphor-icons/react";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const routes = [
  { id: "home", label: "首页" },
  { id: "hall", label: "共创大厅" },
  { id: "dao", label: "探索 DAO" },
];

const opportunities = [
  { dao: "PONYGOGO DAO", type: "产品", title: "PONYGOGO 随身机器人", summary: "让 AI 走进每个人的生活，打造真正有温度的随身智能机器人。", roles: "产品研发、工业设计", stage: "进行中", members: 32, image: assetPath("assets/ponygogo-robot.png"), capability: "研发" },
  { dao: "PONYGOGO DAO", type: "项目", title: "拓展欧美市场", summary: "将 PONYGOGO 的创新产品带给全球更多用户，建立长期市场影响力。", roles: "海外销售、品牌伙伴", stage: "筹备中", members: 18, image: assetPath("assets/global-market.png"), capability: "销售" },
  { dao: "PONYRUN DAO", type: "产品", title: "AI 运动教练", summary: "用 AI 和专业知识，让每个人都能享受科学、有趣的运动生活。", roles: "算法研发、运动专家", stage: "进行中", members: 28, image: assetPath("assets/ai-coach.png"), capability: "研发" },
  { dao: "PONYGREEN DAO", type: "项目", title: "城市清洁能源方案", summary: "连接技术、场景与资本，推动城市能源向可持续方式转型。", roles: "研发工程、商务拓展", stage: "增长中", members: 25, icon: Globe, capability: "投资" },
  { dao: "PONYAUTO DAO", type: "产品", title: "下一代智能座舱", summary: "用更自然的交互方式，重新定义人与汽车的协作体验。", roles: "软件研发、硬件工程", stage: "筹备中", members: 16, icon: Cube, capability: "研发" },
  { dao: "PONYBLUE DAO", type: "项目", title: "海洋生态保护计划", summary: "用技术和行动支持海洋生态保护，让蓝色未来持续延伸。", roles: "数据研发、公益运营", stage: "进行中", members: 20, icon: Handshake, capability: "销售" },
];

const myCollaborations = [
  { dao: "PONYGOGO DAO", type: "产品", title: "PONYGOGO 随身机器人", role: "产品经理", milestone: "核心功能验证", progress: 68, next: "参与方案评审", image: assetPath("assets/ponygogo-robot.png") },
  { dao: "PONYGOGO DAO", type: "项目", title: "拓展欧美市场", role: "市场协作", milestone: "海外市场调研", progress: 42, next: "完善调研报告", image: assetPath("assets/global-market.png") },
  { dao: "PONYRUN DAO", type: "产品", title: "AI 运动教练", role: "产品顾问", milestone: "产品原型设计", progress: 25, next: "参与需求讨论", image: assetPath("assets/ai-coach.png") },
];

function readRoute() {
  const value = window.location.hash.slice(1);
  if (["home", "hall", "dao", "profile"].includes(value)) return value;
  return value === "opportunities" ? "hall" : "home";
}

function Brand({ onNavigate }) {
  return (
    <button className="brand" type="button" onClick={() => onNavigate("home")} aria-label="返回 PONY共创首页">
      <img src={assetPath("assets/pony-logo.png")} alt="" />
      <span>PONY共创</span>
    </button>
  );
}

function Header({ route, onNavigate, onNotice }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <Brand onNavigate={onNavigate} />
      <nav className="desktop-nav" aria-label="主导航">
        {routes.map((item) => (
          <button key={item.id} className={route === item.id ? "active" : ""} type="button" onClick={() => onNavigate(item.id)}>{item.label}</button>
        ))}
      </nav>
      {route === "profile" ? (
        <div className="profile-entry">
          <button className="icon-button" type="button" aria-label="通知" onClick={() => onNotice("目前没有新的通知")}><Bell size={22} /></button>
          <button type="button" onClick={() => onNavigate("profile")}><img src={assetPath("assets/profile-tianyi.png")} alt="田一" /><span>田一 · 产品 OPC</span><CaretDown size={15} /></button>
        </div>
      ) : (
        <div className="header-actions">
          <button className="login-button" type="button" onClick={() => onNavigate("profile")}>登录</button>
          <button className="primary compact" type="button" onClick={() => onNotice("发起共创流程将在下一阶段设计")}>发起共创</button>
        </div>
      )}
      <button className="menu-button" type="button" aria-label={menuOpen ? "关闭导航" : "打开导航"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={26} /> : <List size={28} />}</button>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="移动端导航">
          {[...routes, { id: "profile", label: "个人中心" }].map((item) => <button key={item.id} type="button" onClick={() => { setMenuOpen(false); onNavigate(item.id); }}>{item.label}</button>)}
        </nav>
      )}
    </header>
  );
}

function HomePage({ onNavigate, onNotice }) {
  return (
    <main>
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">OPEN COLLABORATION NETWORK</p>
          <h1>让一个人的能力，<br />进入一群人的事业。</h1>
          <p>在这里，OPC 可以加入真实的产品与项目，<br />以研发、销售或投资共同创造长期价值。</p>
          <div className="hero-actions">
            <button className="primary" type="button" onClick={() => onNavigate("hall")}>进入共创大厅 <ArrowRight size={19} weight="bold" /></button>
            <button className="secondary" type="button" onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}>了解共创方式</button>
          </div>
          <div className="trust-row"><span><CheckCircle />真实的项目机会</span><span><CheckCircle />多元的参与方式</span><span><CheckCircle />共同创造长期价值</span></div>
        </div>
        <div className="hero-network" aria-hidden="true"><span>连接独立个体<br />共创更大的可能</span></div>
      </section>

      <section className="how-section" id="how">
        <div className="section-title-row"><div><h2>PONY共创如何运转</h2><p>三步加入，和更多优秀的 OPC 一起，把想法变成有影响力的事业。</p></div><button className="text-link" type="button" onClick={() => onNotice("完整共创说明将在下一阶段补充")}>了解更多 <ArrowRight /></button></div>
        <div className="step-grid">
          {[{ n: "01", icon: MagnifyingGlass, title: "发现机会", text: "浏览真实的产品与项目，找到与你能力和兴趣匹配的方向。" }, { n: "02", icon: Users, title: "选择参与", text: "以研发、销售或投资等方式加入，与团队共同推进目标。" }, { n: "03", icon: ChartBar, title: "共享成果", text: "贡献被持续记录，项目成长带来的价值由参与者共同分享。" }].map((step) => <article key={step.n}><span className="step-icon"><step.icon size={30} /></span><div><small>{step.n}</small><h3>{step.title}</h3><p>{step.text}</p></div></article>)}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-row"><div><p className="eyebrow">BUILD SOMETHING REAL</p><h2>正在发生的共创</h2><p>从真实的产品和项目开始，找到值得长期投入的方向。</p></div><button className="text-link" type="button" onClick={() => onNavigate("hall")}>查看全部 <ArrowRight /></button></div>
        <div className="featured-grid">
          {opportunities.slice(0, 2).map((item) => <article className="featured-card" key={item.title}><img src={item.image} alt="" /><div><span className="object-label">{item.dao}</span><span className="status-label">{item.stage}</span><h3>{item.title}</h3><p>{item.summary}</p><button type="button" onClick={() => onNavigate(item.dao === "PONYGOGO DAO" ? "dao" : "hall")}>查看共创 <ArrowRight /></button></div></article>)}
        </div>
      </section>
    </main>
  );
}

function OpportunityCard({ item, onNavigate }) {
  const VisualIcon = item.icon;
  return (
    <article className="opportunity-card">
      <div className="card-visual">{item.image ? <img src={item.image} alt="" /> : <VisualIcon size={52} weight="duotone" />}</div>
      <div className="card-body">
        <div className="card-kicker"><span>{item.dao}</span><b>{item.type}</b></div>
        <h3>{item.title}</h3><p>{item.summary}</p>
        <div className="role-line"><Users size={18} /><span>需要的共创伙伴<br /><strong>{item.roles}</strong></span></div>
        <div className="card-meta"><span className={`stage stage-${item.stage}`}>{item.stage}</span><span><Users size={17} />{item.members} 人已加入</span><span><Clock size={17} />长期共创</span></div>
        <div className="card-bottom"><span><ChartBar size={18} />按贡献分配</span><button type="button" onClick={() => onNavigate(item.dao === "PONYGOGO DAO" ? "dao" : "hall")}>查看共创 <ArrowRight /></button></div>
      </div>
    </article>
  );
}

function HallPage({ onNavigate }) {
  const [type, setType] = useState("全部");
  const [capability, setCapability] = useState("全部");
  const [query, setQuery] = useState("");
  const shown = useMemo(() => opportunities.filter((item) => (type === "全部" || item.type === type) && (capability === "全部" || item.capability === capability) && (!query.trim() || `${item.dao}${item.title}${item.summary}${item.roles}`.toLowerCase().includes(query.trim().toLowerCase()))), [type, capability, query]);
  return (
    <main className="hall-page">
      <section className="hall-hero"><div><p className="eyebrow">DISCOVER COLLABORATIONS</p><h1>共创大厅</h1><p>找到值得长期参与的产品与项目，用你的能力成为其中的一部分。</p><div className="hall-stats"><span><b>36</b> 个开放共创</span><span><b>18</b> 个产品</span><span><b>24</b> 个项目</span></div></div></section>
      <section className="discovery-panel">
        <label className="hall-search"><MagnifyingGlass size={25} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索产品、项目、能力或目标" /></label>
        <div className="filter-bar">
          <Filter label="对象类型" values={["全部", "产品", "项目"]} selected={type} onChange={setType} />
          <Filter label="需要的能力" values={["全部", "研发", "销售", "投资"]} selected={capability} onChange={setCapability} />
          <div className="stage-filter"><span>当前阶段：</span><button className="active">全部</button><button>筹备中</button><button>进行中</button><button>增长中</button></div>
          <button className="sort-button" type="button">最新发布 <CaretDown /></button>
        </div>
        <div className="opportunity-grid">{shown.map((item) => <OpportunityCard key={item.title} item={item} onNavigate={onNavigate} />)}</div>
        {shown.length === 0 && <div className="empty-state"><MagnifyingGlass size={34} /><h3>没有找到匹配的共创</h3><p>试试更宽泛的关键词或筛选条件。</p></div>}
      </section>
    </main>
  );
}

function Filter({ label, values, selected, onChange }) {
  return <div className="filter-group"><span>{label}：</span>{values.map((value) => <button key={value} className={selected === value ? "active" : ""} type="button" onClick={() => onChange(value)}>{value}</button>)}</div>;
}

function DaoPage({ onNotice }) {
  const [tab, setTab] = useState("概览");
  return (
    <main className="dao-page">
      <section className="dao-hero">
        <div className="dao-copy"><p className="breadcrumb">探索 DAO&nbsp;&nbsp;/&nbsp;&nbsp;PONYGOGO</p><div className="dao-title"><div className="dao-wordmark">P</div><div><span className="open-label">开放加入</span><h1>PONYGOGO</h1><h2>让智能陪伴走进每个人的日常生活</h2><p>围绕个人智能硬件持续共创产品、市场与服务。</p></div></div><div className="dao-actions"><button className="primary" type="button" onClick={() => onNotice("已记录你的加入意向")}>申请加入 <ArrowRight /></button><button className="secondary" type="button" onClick={() => onNotice("已关注 PONYGOGO")}>关注</button></div><div className="dao-metrics"><span><Users /><b>126</b> 位成员</span><span><Cube /><b>2</b> 个产品</span><span><FileText /><b>3</b> 个项目</span><span><Coins /><b>¥1,280,000</b> 共创金库</span></div></div>
        <div className="dao-product-image"><img src={assetPath("assets/ponygogo-robot.png")} alt="PONYGOGO 随身机器人" /></div>
      </section>
      <nav className="dao-tabs" aria-label="DAO 公开页分区">{["概览", "产品", "项目", "成员", "共创规则"].map((item) => <button key={item} className={tab === item ? "active" : ""} type="button" onClick={() => setTab(item)}>{item}</button>)}</nav>
      <section className="dao-content">
        <div className="dao-main-column">
          <DaoList title="产品" subtitle="共创真实有用的产品，让智能陪伴走进每个人的生活。" items={[{ title: "PONYGOGO 随身机器人", desc: "打造真正有温度的随身智能机器人。", image: assetPath("assets/ponygogo-robot.png"), label: "研发中", progress: 68 }, { title: "智能随身底座", desc: "提供充电、数据同步和家庭场景扩展能力。", icon: Cube, label: "概念验证" }]} />
          <DaoList title="项目" subtitle="从不同方向推动 PONYGOGO 的成长。" items={[{ title: "拓展欧美市场", desc: "建立长期市场影响力与本地渠道合作。", image: assetPath("assets/global-market.png"), label: "筹备中" }, { title: "首批用户共创测试", desc: "和早期用户一起打磨产品体验。", image: assetPath("assets/ponygogo-robot.png"), label: "进行中" }]} />
        </div>
        <aside className="dao-side-column">
          <section><div className="side-title"><h3>当前需要的伙伴</h3><button type="button" onClick={() => onNotice("伙伴列表已是当前完整范围")}>查看全部</button></div>{[{ icon: Gear, t: "产品研发", d: "参与核心功能研发" }, { icon: Sparkle, t: "工业设计", d: "让科技更贴近日常" }, { icon: Globe, t: "海外销售", d: "拓展国际市场" }, { icon: Coins, t: "投资 OPC", d: "支持长期发展" }].map((item) => <div className="partner-row" key={item.t}><span><item.icon /></span><div><b>{item.t}</b><small>{item.d}</small></div></div>)}</section>
          <section><div className="side-title"><h3>价值如何分配</h3><button type="button" onClick={() => onNotice("完整共创规则将在后续页面展开")}>了解更多</button></div>{[{ icon: FileText, t: "记录每个人的贡献" }, { icon: Target, t: "在里程碑中确认价值" }, { icon: Users, t: "共享长期回报" }].map((item) => <div className="rule-row" key={item.t}><item.icon /><span>{item.t}</span></div>)}</section>
        </aside>
      </section>
    </main>
  );
}

function DaoList({ title, subtitle, items }) {
  return <section className="dao-list"><div className="dao-list-title"><h3>{title}</h3><p>{subtitle}</p><button type="button">查看全部{title} <ArrowRight /></button></div>{items.map((item) => { const ItemIcon = item.icon; return <article key={item.title}><div className="list-visual">{item.image ? <img src={item.image} alt="" /> : <ItemIcon size={38} weight="duotone" />}</div><div className="list-copy"><h4>{item.title}</h4><p>{item.desc}</p><span>{item.label}</span></div>{item.progress && <div className="inline-progress"><small>研发进度 <b>{item.progress}%</b></small><i><em style={{ width: `${item.progress}%` }} /></i></div>}<ArrowRight className="list-arrow" /></article>; })}</section>;
}

function ProfilePage({ onNotice }) {
  const [section, setSection] = useState("个人概览");
  return (
    <main className="profile-page">
      <aside className="profile-sidebar"><div className="profile-card"><img src={assetPath("assets/profile-tianyi.png")} alt="田一" /><h2>田一</h2><p>产品 OPC</p></div><nav>{[{ icon: UserCircle, label: "个人概览" }, { icon: Briefcase, label: "我的共创" }, { icon: Clock, label: "贡献记录" }, { icon: Wallet, label: "收益与分账" }, { icon: Gear, label: "账号设置" }].map((item) => <button key={item.label} className={section === item.label ? "active" : ""} type="button" onClick={() => { setSection(item.label); onNotice(`已切换到：${item.label}`); }}><item.icon size={22} />{item.label}</button>)}</nav><button className="logout" type="button" onClick={() => onNotice("视觉稿暂不执行退出登录")}><SignOut size={21} />退出登录</button></aside>
      <div className="profile-main"><section className="profile-greeting"><h1>下午好，田一</h1><p>这是你正在参与的共创与累积成果。</p></section><section className="metric-row">{[{ icon: Users, label: "参与共创", value: "4", unit: "个" }, { icon: FileText, label: "进行中任务", value: "7", unit: "个" }, { icon: Clock, label: "累计贡献", value: "286", unit: "小时" }, { icon: Coins, label: "总收益", value: "¥128,600", unit: "" }].map((item) => <div key={item.label}><item.icon size={32} /><span><small>{item.label}</small><strong>{item.value} <em>{item.unit}</em></strong></span></div>)}</section>
        <section className="my-work"><div className="panel-heading"><h2>我参与的共创</h2><button type="button" onClick={() => onNotice("已展示当前全部参与项目")}>查看全部共创 <ArrowRight /></button></div>{myCollaborations.map((item) => <article key={item.title}><img src={item.image} alt="" /><div className="work-title"><span>{item.dao} · {item.type}</span><h3>{item.title}</h3></div><div><small>我的角色</small><b>{item.role}</b></div><div><small>当前里程碑</small><b>{item.milestone}</b><span className="mini-status">进行中</span></div><div className="progress-cell"><small>项目进度 <b>{item.progress}%</b></small><i><em style={{ width: `${item.progress}%` }} /></i></div><button className="next-action" type="button" onClick={() => onNotice(item.next)}><small>下一步</small>{item.next}<ArrowRight /></button></article>)}</section>
        <div className="profile-lower"><section className="earnings-panel"><div className="panel-heading"><h2>收益概览</h2><button type="button" onClick={() => onNotice("分账明细页将在下一阶段设计")}>查看分账明细 <ArrowRight /></button></div><div className="earnings-numbers"><span><small>可提现</small><b>¥18,400</b></span><span><small>待确认</small><b>¥9,600</b></span><span><small>累计收益</small><b>¥128,600</b></span></div><div className="bar-chart" aria-label="1月至6月收益增长趋势">{[28, 36, 42, 58, 70, 86].map((height, index) => <span key={height}><i style={{ height: `${height}%` }} /><small>{index + 1}月</small></span>)}</div></section><section className="activity-panel"><div className="panel-heading"><h2>近期动态</h2></div>{[{ icon: Target, t: "里程碑已确认", d: "PONYGOGO 随身机器人 · 核心功能验证", time: "4月12日" }, { icon: FileText, t: "贡献记录已更新", d: "本周贡献 12 小时 · 产品方案设计", time: "4月10日" }, { icon: Coins, t: "收益已分配", d: "来自 PONYGOGO DAO 的项目收益", time: "+ ¥12,600" }].map((item) => <div className="activity-row" key={item.t}><span><item.icon /></span><div><b>{item.t}</b><small>{item.d}</small></div><time>{item.time}</time></div>)}</section></div>
      </div>
    </main>
  );
}

export function App() {
  const [route, setRoute] = useState(readRoute);
  const [toast, setToast] = useState("");
  useEffect(() => { const update = () => setRoute(readRoute()); window.addEventListener("hashchange", update); return () => window.removeEventListener("hashchange", update); }, []);
  useEffect(() => { document.title = `${route === "home" ? "首页" : route === "hall" ? "共创大厅" : route === "dao" ? "PONYGOGO" : "个人中心"} · PONY共创`; window.scrollTo({ top: 0, behavior: "instant" }); }, [route]);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(""), 2400); return () => window.clearTimeout(timer); }, [toast]);
  const navigate = (next) => { if (readRoute() === next) setRoute(next); window.location.hash = next; };
  return <div className="site-shell" style={{ "--network-image": `url("${assetPath("assets/hero-network-bg.png")}")` }}><a className="skip-link" href="#main-content">跳到主要内容</a><Header route={route} onNavigate={navigate} onNotice={setToast} /><div id="main-content">{route === "home" && <HomePage onNavigate={navigate} onNotice={setToast} />}{route === "hall" && <HallPage onNavigate={navigate} />}{route === "dao" && <DaoPage onNotice={setToast} />}{route === "profile" && <ProfilePage onNotice={setToast} />}</div><div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div></div>;
}
