/**
 * 插件设计
 * 
 * 在 https://github.com/QiYuOr2/y-bot 中有应用
 */

/**
 * 插件基础接口，可以自行扩充
 */
declare interface IPlugin {
  /**
   * Entry统一调用该方法处理Plugin
   */
  main<T>(options?: T): void;
}


/**
 * 插件基类，实现了通用方法，比如入口统一调用所需要的main
 */
class BasePlugin implements IPlugin {
  main(message: any) {
    return this.exec(/* args */);
  }

  exec() {
   // do something
  }
}

/**
 * 自定义插件，各个插件的逻辑写在构造方法中，同时也可以自定义main方法
 */
class APlugin extends BasePlugin {
  constructor() {
    super()

    // 实现插件逻辑
  }
}
class BPlugin extends BasePlugin {
  constructor() {
    super()

    // 实现插件逻辑
  }
}

// import * as PluginModules from 'path/plugins'
const PluginModules = { plugin1: APlugin, plugin2: BPlugin }

/**
 * 入口，判断调用哪个plugin
 */
class Entry {
  static instance: Entry;
  static create() {
    if (!this.instance) {
      this.instance = new Entry();
    }
    return this.instance;
  }

  plugins: IPlugin[] = [];
  constructor() {
    this.loadPlugins();
  }

  loadPlugins() {
    this.plugins = Object.values(PluginModules).map((P) => new P());
    // 其他处理
  }

  run() {
    // 判断要执行哪个插件，一般根据处理好的输入判断
    this.plugins[0].main(/* 统一入参 */)
  }
}

// 调用
Entry.create().run()