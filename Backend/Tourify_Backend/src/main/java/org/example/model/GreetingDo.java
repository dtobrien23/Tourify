package org.example.model;

import lombok.Data;

/**
 * JavaBean（是java类）是一种JAVA语言写成的可重用组件（Component）。为写成JavaBean，类必须是具体的和公共的，
 * 并且具有无参数的构造器。JavaBean 通过提供符合一致性设计模式的公共方法将内部域暴露成员属性，set和get方法获取。
 */

//也可以使用lombok注解简化代码,避免写set/get方法以及初始化构造器
@Data
public class GreetingDo {
    private final long id;
    private final String content;

//    初始化构造器
//    public Greeting(long id, String content){
//        this.id = id;
//        this.content = content;
//    }

}
