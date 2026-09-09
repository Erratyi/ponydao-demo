import {sitePath} from "../lib/site-path";
import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'PonyDAO · 交互演示',description:'PonyDAO 产品交互演示，所有数据均为虚拟示例',icons:{icon:sitePath('/logo.png')}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
