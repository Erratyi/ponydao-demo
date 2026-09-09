import {allocate,cents} from '../lib/money';
type Row={id:string;daoId:string;kind:string;ownerId:string;status:string;data:any;createdAt:string};
type Store={users:any[];daos:any[];members:any[];records:Row[];current:string};
const KEY='ponydao-demo-v1';
export const demoUsers=[{id:'demo-admin',name:'林舟 · 管理员',email:'admin@example.test',opc:'平台演示 OPC',isPlatformAdmin:true},{id:'demo-dev',name:'陈曦 · 研发',email:'dev@example.test',opc:'机器人研发 OPC',isPlatformAdmin:false},{id:'demo-sales',name:'周航 · 销售',email:'sales@example.test',opc:'海外增长 OPC',isPlatformAdmin:false},{id:'demo-investor',name:'许宁 · 投资',email:'investor@example.test',opc:'科创投资 OPC',isPlatformAdmin:false},{id:'demo-finance',name:'方晴 · 财务审核',email:'finance@example.test',opc:'财务协作 OPC',isPlatformAdmin:false}];
const roles=['research','sales','investor'],permissions=['manage','finance','review'];
let memory:Store|undefined;
function seed():Store{
 const daos=[{id:'gogo',name:'PONYGOGO',mission:'共建随身机器人，让智能陪伴走向全球。'},{id:'run',name:'PONYRUN',mission:'连接运动设备与训练服务，探索运动科技协作。'},{id:'studio',name:'PONY STUDIO',mission:'设计 OPC 共同打造数字产品与品牌体验。'}];
 const members=daos.slice(0,2).flatMap(d=>demoUsers.map((u,i)=>({id:d.id+'-'+u.id,daoId:d.id,userId:u.id,roles:i===0?roles:[['research'],['sales'],['investor'],['research']][i-1],permissions:i===0?permissions:i===4?['finance','review']:[],status:'active'})));
 const records:Row[]=[];const add=(id:string,daoId:string,kind:string,status:string,data:any,ownerId='demo-admin')=>records.push({id,daoId,kind,status,data,ownerId,createdAt:new Date(Date.now()-86400000).toISOString()});
 add('robot','gogo','product','active',{name:'PONYGOGO 随身机器人',description:'完成便携机器人原型，验证语音陪伴与多语言交互。',leaderId:'demo-admin',progress:68,links:['europe']});
 add('europe','gogo','project','active',{name:'拓展欧美市场',description:'与海外渠道伙伴开展试销，验证首批用户需求。',leaderId:'demo-admin',progress:42,links:['robot']});
 add('run-device','run','product','active',{name:'PONYRUN 运动传感器',description:'采集跑步姿态与步频，为训练提供反馈。',leaderId:'demo-admin',progress:35,links:['run-pilot']});
 add('run-pilot','run','project','active',{name:'城市跑团试点',description:'邀请跑团体验设备并反馈训练场景。',leaderId:'demo-admin',progress:20,links:['run-device']});
 add('brand','studio','product','active',{name:'OPC 品牌工具包',description:'面向独立团队的品牌识别与展示组件。',leaderId:'demo-admin',progress:55,links:[]});
 add('part-dev','gogo','participation','approved',{targetId:'robot',role:'research',note:'负责语音交互和原型调试。'},'demo-dev');
 add('part-sales','gogo','participation','approved',{targetId:'europe',role:'sales',note:'负责渠道接洽与用户访谈。'},'demo-sales');
 add('part-run','run','participation','pending',{targetId:'run-device',role:'research',note:'希望参与传感器算法验证。'},'demo-dev');
 add('evidence','gogo','evidence','pending',{targetId:'robot',title:'多语言语音交互原型',description:'已完成中英文对话演示，提交本阶段成果供确认。',version:1,fileId:'sample-file'},'demo-dev');
 add('sales-evidence','gogo','evidence','confirmed',{targetId:'europe',title:'海外渠道首轮访谈',description:'完成 8 家演示渠道访谈，整理试销建议。',version:1,reviewNote:'访谈结构完整，可进入试销准备。'},'demo-sales');
 add('sample-file','gogo','file','stored',{name:'语音原型说明（示例）.txt',sha256:'0'.repeat(64),size:128},'demo-dev');
 for(const d of ['gogo','run']){
  add(d+'-investment',d,'income','confirmed',{amount:6000000,category:'investment',investorId:'demo-investor',note:'DAO 初期研发出资（虚拟）'});
  add(d+'-revenue',d,'income','confirmed',{amount:1000000,category:'revenue',targetId:d==='gogo'?'robot':'run-device',note:'首批体验订单收入（虚拟）'});
  const shares=[{userId:'demo-admin',bps:2000},{userId:'demo-dev',bps:4000},{userId:'demo-sales',bps:2000},{userId:'demo-investor',bps:2000}];
  add(d+'-rule',d,'proposal','executed',{type:'rule',title:'首期收益分配规则',description:'按本期协作约定分配业务收入。',version:1,shares,voters:demoUsers.map(u=>u.id),deadline:Date.now()-3600000,executionNote:'演示规则已执行。'});
  add(d+'-allocation',d,'allocation','published',{amount:400000,sourceId:d+'-revenue',ruleId:d+'-rule',ruleVersion:1,rows:allocate(400000,shares),note:'首期协作收益（虚拟）',reviewerId:'demo-finance'});
 }
 add('budget','gogo','proposal','executed',{type:'budget',title:'第二轮原型物料预算',description:'用于原型外壳、传感器与打样。',budgetAmount:2000000,voters:demoUsers.map(u=>u.id),deadline:Date.now()-3600000,executionNote:'预算已批准，按凭证登记支出。'});
 add('vote-open','gogo','proposal','voting',{type:'general',title:'是否启动欧美市场小批量试销？',description:'建议以 50 台演示订单验证定价、渠道和售后需求。',deadline:Date.now()+7*86400000,voters:demoUsers.map(u=>u.id)});
 add('withdraw-paid','gogo','withdrawal','paid',{amount:20000,account:'演示收款账户（非真实账号）',note:'历史提现示例',paidBy:'demo-finance'},'demo-dev');
 add('withdraw-pending','gogo','withdrawal','pending',{amount:10000,account:'演示收款账户（非真实账号）'},'demo-sales');
 add('notice-admin','gogo','notification','unread',{message:'研发成果和销售成员提现等待审核。'});
 add('notice-dev','gogo','notification','unread',{message:'首期协作收益已发布，可以查看收益来源。'},'demo-dev');
 return {users:structuredClone(demoUsers),daos,members,records,current:'demo-admin'};
}
function load(){if(!memory){try{const raw=typeof localStorage!=='undefined'?localStorage.getItem(KEY):null;memory=raw?JSON.parse(raw):seed();}catch{memory=seed();}}return memory!;}
function save(){if(typeof localStorage!=='undefined')localStorage.setItem(KEY,JSON.stringify(memory));}
export function resetDemo(){memory=seed();save();}
export function switchDemoUser(id:string){if(!load().users.some(u=>u.id===id))return;load().current=id;save();}
export function demoFileUrl(id:string){return 'data:text/plain;charset=utf-8,'+encodeURIComponent('PonyDAO 演示附件\n这是一份虚拟附件说明，不包含真实上传内容。\n编号：'+id);}
function snapshot(s:Store,daoId:string){
 const user=s.users.find(u=>u.id===s.current),dao=s.daos.find(d=>d.id===daoId);
 if(!dao)throw Error('DAO 不存在');
 const memberships=s.members.filter(m=>m.userId===user.id&&m.status==='active').map(m=>({...m,dao:s.daos.find(d=>d.id===m.daoId)}));
 const actual=memberships.find(m=>m.daoId===daoId);
 if(!actual&&!user.isPlatformAdmin)throw Error('请先加入该 DAO');
 const member=user.isPlatformAdmin?{id:actual?.id??'virtual-admin',daoId,userId:user.id,status:'active',roles,permissions}:actual;
 const members=s.members.filter(m=>m.daoId===daoId).map(m=>({...m,user:s.users.find(u=>u.id===m.userId)}));
 if(!members.some(m=>m.userId===user.id))members.push({...member,user});
 const all=s.records.filter(r=>r.daoId===daoId);
 const records=all.filter(r=>!(r.kind==='notification'&&r.ownerId!==user.id)&&!(r.kind==='withdrawal'&&r.ownerId!==user.id&&!member.permissions.includes('finance')));
 return {user,dao,member,members,memberships,records,treasury:{paid:all.filter(r=>r.kind==='withdrawal'&&r.status==='paid').reduce((n,r)=>n+r.data.amount,0)}};
}
function platform(s:Store){
 const user=s.users.find(u=>u.id===s.current),memberships=s.members.filter(m=>m.userId===user.id).map(m=>({...m,dao:s.daos.find(d=>d.id===m.daoId)}));
 const catalog=s.daos.map(d=>{const assets=s.records.filter(r=>r.daoId===d.id&&['product','project'].includes(r.kind)).map(r=>({id:r.id,kind:r.kind,...r.data}));return {...d,assets,memberCount:s.members.filter(m=>m.daoId===d.id&&m.status==='active').length,productCount:assets.filter(a=>a.kind==='product').length,projectCount:assets.filter(a=>a.kind==='project').length,membership:memberships.find(m=>m.daoId===d.id)?.status??null};});
 return {user,demoActors:s.users.map(u=>({id:u.id,name:u.name})),memberships,catalog,bundles:catalog.filter(d=>user.isPlatformAdmin||d.membership==='active').map(d=>snapshot(s,d.id))};
}
function action(s:Store,daoId:string,op:string,input:any):any {
 const user=s.users.find(u=>u.id===s.current);
 const text=(key:string)=>{const value=String(input[key]??'').trim();if(!value)throw Error('请填写完整信息');return value;};
 const make=(kind:string,status:string,data:any,ownerId=s.current):Row=>{const r={id:crypto.randomUUID(),daoId,kind,status,data,ownerId,createdAt:new Date().toISOString()};s.records.unshift(r);return r;};
 if(op==='dao.create'){
  if(!user.isPlatformAdmin&&!s.members.some(m=>m.userId===s.current&&m.permissions.includes('manage')))throw Error('请切换到管理员体验此操作');
  const d={id:crypto.randomUUID(),name:text('name'),mission:text('mission')};s.daos.push(d);s.members.push({id:crypto.randomUUID(),daoId:d.id,userId:s.current,status:'active',roles,permissions});return d;
 }
 const snap=snapshot(s,daoId),member=snap.member;
 const can=(p:string)=>{if(!member.permissions.includes(p))throw Error('当前角色没有此权限，请切换到相应演示角色');};
 const find=(id:string,kind?:string)=>{const r=s.records.find(r=>r.daoId===daoId&&r.id===id&&(!kind||r.kind===kind));if(!r)throw Error('演示记录不存在');return r;};
 const active=(id:string)=>{if(!snap.members.some(m=>m.userId===id&&m.status==='active'))throw Error('请选择有效成员');};
 const review=(r:Row,permission:string)=>{const target=find(r.data.targetId);if(target.data.leaderId!==s.current)can(permission);};
 const progress=()=>{const n=Number(input.progress);if(!Number.isInteger(n)||n<0||n>100)throw Error('进度须为 0–100 的整数');return n;};
 const receipt=()=>{if(!input.fileId)throw Error('请选取演示凭证文件（文件内容不会上传）');find(input.fileId,'file');};
 const used=(sourceId:string)=>s.records.filter(r=>r.daoId===daoId&&(r.kind==='expense'||r.kind==='allocation'&&r.status!=='cancelled')&&r.data.sourceId===sourceId).reduce((n,r)=>n+r.data.amount,0);
 const notify=(ownerId:string,message:string)=>make('notification','unread',{message},ownerId);
 let result:any;
 switch(op){
  case 'entity.create':case 'entity.update':{
   can('manage');if(!['product','project'].includes(input.kind))throw Error('请选择产品或项目');active(input.leaderId);
   const links=input.links??[];links.forEach((id:string)=>find(id,input.kind==='product'?'project':'product'));
   const data={name:text('name'),description:text('description'),leaderId:input.leaderId,progress:progress(),links};
   result=op==='entity.create'?make(input.kind,'active',data):find(input.id,input.kind);result.data=data;
   for(const r of s.records.filter(r=>r.daoId===daoId&&r.kind===(input.kind==='product'?'project':'product'))){r.data.links=(r.data.links??[]).filter((id:string)=>id!==result.id);if(links.includes(r.id))r.data.links.push(result.id);}break;
  }
  case 'progress':{const r=find(input.id);if(r.data.leaderId!==s.current)can('manage');r.data={...r.data,progress:progress(),progressNote:text('note')};result=r;break;}
  case 'participate':{
   const target=find(input.targetId);if(!['product','project'].includes(target.kind)||!['research','sales'].includes(input.role)||!member.roles.includes(input.role))throw Error('请使用研发或销售角色参与产品/项目');
   if(s.records.some(r=>r.daoId===daoId&&r.kind==='participation'&&r.ownerId===s.current&&r.data.targetId===target.id&&['pending','approved'].includes(r.status)))throw Error('已申请或已参与该对象');
   result=make('participation','pending',{targetId:target.id,role:input.role,note:text('note')});notify(target.data.leaderId,'有新的参与申请等待审批。');break;
  }
  case 'participation.review':{const r=find(input.id,'participation');review(r,'manage');if(r.status!=='pending')throw Error('申请已处理');r.status=input.approve?'approved':'rejected';r.data.reviewNote=text('note');result=r;break;}
  case 'evidence.save':case 'evidence.submit':{
   const target=find(input.targetId);if(!user.isPlatformAdmin&&target.data.leaderId!==s.current&&!s.records.some(r=>r.kind==='participation'&&r.ownerId===s.current&&r.status==='approved'&&r.data.targetId===target.id))throw Error('请先申请参与');
   const data={targetId:target.id,title:text('title'),description:text('description'),fileId:input.fileId??null};
   if(input.id){result=find(input.id,'evidence');if(result.ownerId!==s.current||!['draft','rejected'].includes(result.status))throw Error('该成果不可编辑');result.data={...data,version:result.data.version+1};result.status=op==='evidence.save'?'draft':'pending';}
   else result=make('evidence',op==='evidence.save'?'draft':'pending',{...data,version:1});
   if(result.status==='pending')notify(target.data.leaderId,'有新成果等待确认。');break;
  }
  case 'evidence.review':{const r=find(input.id,'evidence');review(r,'review');if(r.ownerId===s.current)throw Error('请切换到另一位确认角色，不能确认自己的成果');if(r.status!=='pending')throw Error('成果已处理');r.status=input.approve?'confirmed':'rejected';Object.assign(r.data,{reviewNote:text('note'),reviewerId:s.current});notify(r.ownerId,'成果状态已更新。');result=r;break;}
  case 'invite':{
   can('manage');if(!input.roles?.length)throw Error('请选择经济身份');
   const uid=crypto.randomUUID();s.users.push({id:uid,name:'新加入的演示成员',email:'guest@example.test',opc:'虚拟 OPC',isPlatformAdmin:false});s.members.push({id:crypto.randomUUID(),daoId,userId:uid,roles:input.roles,permissions:[],status:'pending'});result={token:'demo-only'};break;
  }
  case 'member.approve':{can('manage');const m=s.members.find(m=>m.id===input.id&&m.daoId===daoId);if(!m||m.status!=='pending')throw Error('成员申请已处理');m.status=input.approve?'active':'rejected';result=m;break;}
  case 'proposal.create':{
   const deadline=Date.parse(input.deadline);if(!Number.isFinite(deadline)||deadline<=Date.now())throw Error('请选择未来的截止时间');
   const data:any={type:input.type,title:text('title'),description:text('description'),deadline,voters:s.members.filter(m=>m.daoId===daoId&&m.status==='active').map(m=>m.userId)};
   if(input.type==='rule'){allocate(10000,input.shares);input.shares.forEach((r:any)=>active(r.userId));data.shares=input.shares;data.version=s.records.filter(r=>r.daoId===daoId&&r.kind==='proposal'&&r.data.type==='rule').length+1;}
   if(input.type==='budget')data.budgetAmount=cents(input.budgetAmount);
   if(input.type==='permission'){active(input.targetUserId);if(!permissions.includes(input.permission))throw Error('权限类型错误');data.targetUserId=input.targetUserId;data.permission=input.permission;}
   result=make('proposal','voting',data);break;
  }
  case 'vote':{const r=find(input.id,'proposal');if(r.status!=='voting'||Date.now()>=r.data.deadline)throw Error('投票已结束');if(!r.data.voters.includes(s.current))throw Error('当前角色不在本次投票成员中');if(s.records.some(v=>v.kind==='vote'&&v.ownerId===s.current&&v.data.proposalId===r.id))throw Error('每位成员仅能投票一次');result=make('vote','cast',{proposalId:r.id,approve:input.approve===true});break;}
  case 'proposal.close':{const r=find(input.id,'proposal'),votes=s.records.filter(v=>v.kind==='vote'&&v.data.proposalId===r.id);if(r.status!=='voting')throw Error('提案已结束');if(Date.now()<r.data.deadline&&votes.length<r.data.voters.length)throw Error('请切换其他演示角色完成投票，或等待截止');r.status=votes.filter(v=>v.data.approve).length>r.data.voters.length/2?'passed':'rejected';result=r;break;}
  case 'proposal.execute':{can('manage');const r=find(input.id,'proposal');if(r.status!=='passed')throw Error('仅通过的提案可以执行');r.status='executed';r.data.executionNote=text('note');if(r.data.type==='permission'){const m=s.members.find(m=>m.daoId===daoId&&m.userId===r.data.targetUserId);m.permissions=[...new Set([...m.permissions,r.data.permission])];}result=r;break;}
  case 'income':{can('finance');receipt();const amount=cents(input.amount);if(input.category==='investment'){active(input.investorId);if(!s.members.find(m=>m.daoId===daoId&&m.userId===input.investorId)?.roles.includes('investor'))throw Error('请选择投资成员');}else{const r=find(input.targetId);if(!['product','project'].includes(r.kind))throw Error('请选择收入归属对象');}result=make('income','confirmed',{amount,category:input.category,investorId:input.category==='investment'?input.investorId:null,targetId:input.category==='revenue'?input.targetId:null,fileId:input.fileId,note:text('note')});break;}
  case 'allocation.create':{can('finance');const source=find(input.sourceId,'income'),rule=find(input.ruleId,'proposal'),amount=cents(input.amount);if(source.data.category!=='revenue')throw Error('出资本金不能直接分账');if(rule.status!=='executed'||rule.data.type!=='rule')throw Error('请选择已执行分账规则');if(amount+used(source.id)>source.data.amount)throw Error('超过来源可用金额');result=make('allocation','draft',{amount,sourceId:source.id,ruleId:rule.id,ruleVersion:rule.data.version,rows:allocate(amount,rule.data.shares),note:text('note')});break;}
  case 'allocation.publish':case 'allocation.cancel':{can('finance');const r=find(input.id,'allocation');if(r.status!=='draft')throw Error('分账单已处理');if(op==='allocation.publish'&&r.ownerId===s.current)throw Error('请切换到财务审核角色，不能发布自己编制的分账');r.status=op==='allocation.publish'?'published':'cancelled';r.data.reviewerId=s.current;result=r;break;}
  case 'expense':{can('finance');receipt();const source=find(input.sourceId,'income'),p=find(input.proposalId,'proposal'),amount=cents(input.amount);if(p.status!=='executed'||p.data.type!=='budget')throw Error('请选择已执行预算');const spent=s.records.filter(r=>r.kind==='expense'&&r.data.proposalId===p.id).reduce((n,r)=>n+r.data.amount,0);if(amount+spent>p.data.budgetAmount||amount+used(source.id)>source.data.amount)throw Error('超过预算或来源可用金额');result=make('expense','paid',{amount,sourceId:source.id,proposalId:p.id,fileId:input.fileId,note:text('note')});break;}
  case 'withdraw':{const amount=cents(input.amount);const earned=s.records.filter(r=>r.daoId===daoId&&r.kind==='allocation'&&r.status==='published').flatMap(r=>r.data.rows).filter((r:any)=>r.userId===s.current).reduce((n:number,r:any)=>n+r.amount,0);const held=s.records.filter(r=>r.daoId===daoId&&r.kind==='withdrawal'&&r.ownerId===s.current&&['pending','approved','paid'].includes(r.status)).reduce((n,r)=>n+r.data.amount,0);if(amount>earned-held)throw Error('可提现余额不足');result=make('withdrawal','pending',{amount,account:text('account')});break;}
  case 'withdraw.review':case 'withdraw.pay':{can('finance');const r=find(input.id,'withdrawal');if(r.ownerId===s.current)throw Error('请切换到另一位财务角色处理自己的提现');if(op==='withdraw.pay'){if(r.status!=='approved')throw Error('请先审批');receipt();r.status='paid';r.data.fileId=input.fileId;r.data.paidBy=s.current;}else{if(r.status!=='pending')throw Error('申请已处理');r.status=input.approve?'approved':'rejected';r.data.reviewerId=s.current;}r.data.note=text('note');result=r;break;}
  case 'notification.read':{const r=find(input.id,'notification');if(r.ownerId!==s.current)throw Error('只能处理自己的通知');r.status='read';result=r;break;}
  case 'profile':user.name=text('name');user.opc=text('opc');result=user;break;
  default:throw Error('此演示操作尚未支持');
 }
 make('audit','recorded',{op,recordId:result?.id??null});return result;
}
export async function demoFetch(input:RequestInfo|URL,options?:RequestInit):Promise<Response>{
 try{
  const url=new URL(String(input),'http://demo.invalid'),s=load();let result:any;
  if(url.pathname==='/api/platform')result=platform(s);
  else if(url.pathname==='/api/state')result=snapshot(s,url.searchParams.get('dao')??s.daos[0].id);
  else if(url.pathname==='/api/bootstrap')result={needsSetup:false};
  else if(url.pathname==='/api/action'){const b=JSON.parse(String(options?.body));const next=structuredClone(s);result=action(next,b.daoId,b.op,b.input);memory=next;save();}
  else if(url.pathname==='/api/profile'){const b=JSON.parse(String(options?.body)),u=s.users.find(u=>u.id===s.current);if(!b.name?.trim()||!b.opc?.trim())throw Error('请填写姓名和 OPC 名称');u.name=b.name;u.opc=b.opc;save();result={ok:true};}
  else if(url.pathname==='/api/upload'){const form=options?.body as FormData,file=form.get('file') as File;if(!file?.size||file.size>10*1024*1024)throw Error('请选择 10MB 以内的附件');const sha=await crypto.subtle.digest('SHA-256',await file.arrayBuffer());const r:Row={id:crypto.randomUUID(),daoId:String(form.get('daoId')),kind:'file',status:'stored',ownerId:s.current,createdAt:new Date().toISOString(),data:{name:file.name+'（仅演示文件信息）',size:file.size,sha256:Array.from(new Uint8Array(sha)).map(b=>b.toString(16).padStart(2,'0')).join('')}};s.records.unshift(r);save();result=r;}
  else if(url.pathname==='/api/logout'){result={ok:true};}
  else if(url.pathname==='/api/join'||url.pathname==='/api/register'||url.pathname==='/api/login')throw Error('演示无需注册登录，请使用上方体验角色切换。');
  else throw Error('演示版不连接真实接口');
  return Response.json(result);
 }catch(e){return Response.json({error:(e as Error).message},{status:400});}
}
