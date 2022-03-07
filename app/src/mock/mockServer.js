//  该文件用来mock模拟数据，使用同目录下json文件的内容
//  引入mockjs模块
import Mock from 'mockjs';
//  把JSON数据格式引入
//  JSON数据格式没有对外暴露，但是可以引入
//  ==> webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

//  mock数据
//  第一个参数请求地址
//  第二个参数请求数据
//  模拟首页轮播图数据
Mock.mock('/mock/banner', { code: 200, data: banner });
//  模拟首页轮播图数据
Mock.mock('/mock/floor', { code: 200, data: floor });

//
