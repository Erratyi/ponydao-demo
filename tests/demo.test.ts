import {test} from 'node:test';
import assert from 'node:assert/strict';
import {demoFetch,resetDemo,switchDemoUser,demoUsers} from '../app/demo-api';
async function call(path:string,body?:any){const r=await demoFetch(path,body?{method:'POST',body:JSON.stringify(body)}:undefined);const data=await r.json();if(!r.ok)throw Error(data.error);return data;}
const act=(op:string,input:any)=>call('/api/action',{daoId:'gogo',op,input});
test('市场与多角色使用虚拟数据，拒绝真实接口',async()=>{
 resetDemo();const s=await call('/api/platform');assert.equal(s.catalog.length,3);assert.ok(s.user.email.endsWith('.test'));assert.equal(s.bundles.length,3);
 switchDemoUser('demo-dev');const d=await call('/api/platform');assert.equal(d.bundles.length,2);assert.equal(d.catalog.find((d:any)=>d.id==='studio').membership,null);
 assert.equal((await demoFetch('https://example.com/unknown')).status,400);
});
test('成果确认、分账双人审核、提现余额和重置',async()=>{
 resetDemo();await act('evidence.review',{id:'evidence',approve:true,note:'确认演示贡献'});
 const allocation=await act('allocation.create',{sourceId:'gogo-revenue',ruleId:'gogo-rule',amount:'100',note:'演示分账'});
 await assert.rejects(act('allocation.publish',{id:allocation.id}),/切换/);
 switchDemoUser('demo-finance');await act('allocation.publish',{id:allocation.id});
 switchDemoUser('demo-dev');await assert.rejects(act('withdraw',{amount:'999999',account:'演示账户'}),/余额不足/);
 const withdrawal=await act('withdraw',{amount:'10',account:'演示账户'});
 switchDemoUser('demo-admin');await act('withdraw.review',{id:withdrawal.id,approve:false,note:'演示退回'});
 let s=await call('/api/state?dao=gogo');assert.equal(s.records.find((r:any)=>r.id===withdrawal.id).status,'rejected');
 resetDemo();s=await call('/api/state?dao=gogo');assert.equal(s.records.find((r:any)=>r.id==='evidence').status,'pending');assert.ok(!s.records.some((r:any)=>r.id===withdrawal.id));
});
test('多角色投票、创建和双向关联',async()=>{
 resetDemo();for(const u of demoUsers){switchDemoUser(u.id);await act('vote',{id:'vote-open',approve:true});}
 await assert.rejects(act('vote',{id:'vote-open',approve:true}),/仅能投票一次/);
 switchDemoUser('demo-admin');await act('proposal.close',{id:'vote-open'});await act('proposal.execute',{id:'vote-open',note:'演示执行'});
 const product=await act('entity.create',{kind:'product',name:'演示新产品',description:'虚拟对象',leaderId:'demo-admin',progress:0,links:['europe']});
 const s=await call('/api/state?dao=gogo');assert.ok(s.records.find((r:any)=>r.id==='europe').data.links.includes(product.id));
 await act('invite',{roles:['sales'],email:'virtual@example.test'});const state=await call('/api/state?dao=gogo');assert.ok(state.members.some((m:any)=>m.status==='pending'));
 resetDemo();
});
