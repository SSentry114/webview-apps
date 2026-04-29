System.register("q-bundled:///fs/cocos/core/data/decorators/serializable.js", ["../../../../../virtual/internal%253Aconstants.js", "./utils.js", "./property.js", "../class-stash.js", "../serialization-metadata.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, emptyDecorator, getOrCreatePropertyStash, PropertyStashInternalFlag, getOrCreateSerializationMetadata, WITH_SERIALIZATION, serializable, editorOnly, uniquelyReferenced;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @engineInternal
   */
  function formerlySerializedAs(name) {
    return (target, propertyKey, descriptorOrInitializer) => {
      const propertyStash = getOrCreatePropertyStash(target, propertyKey, descriptorOrInitializer);
      propertyStash.formerlySerializedAs = name;
      setImplicitSerializable(propertyStash);
    };
  }
  /**
   * @en
   * Marks the property as editor only.
   * @zh
   * 设置该属性仅在编辑器中生效。
   */


  function setImplicitSerializable(propertyStash) {
    propertyStash.__internalFlags |= PropertyStashInternalFlag.IMPLICIT_SERIALIZABLE;
  }
  /**
   * @en
   * Marks the target class as "uniquely referenced" which means, in the aspect of serialization,
   * no more than one object should reference the same instance of that class.
   * When serializing references to objects of such class,
   * they're treated as different objects even if they point to actually the same.
   * While deserializing, these two references would point two distinct objects.
   * For example:
   * ```ts
   * import { _decorator } from 'cc';
   * @_decorator.ccclass
   * @_decorator.uniquelyReferenced
   * class Foo { }
   *
   * @_decorator.ccclass
   * class Bar {
   *   @_decorator.property
   *   public foo = new Foo();
   * }
   *
   * const bar1 = new Bar();
   * const bar2 = new Bar();
   * bar2.foo = bar1.foo; // Programmatically let them reference to the same
   * ```
   * `bar1` and `bar2` reference to the same `Foo` object.
   * However, after deserializing, `bar1.foo === bar2.foo` always evaluates to `false`.
   * @zh
   * 将目标类标记为“被唯一引用”的，其意味着就序列化而言，不会有多个对象引用该类的同一实例。
   * 当序列化到该类的对象引用时，即使它们明面上指向同一对象，也会被当作是不同对象；
   * 而当反序列化后，这两个引用将指向截然不同的两个对象。
   * 例如：
   * ```ts
   * import { _decorator } from 'cc';
   * @_decorator.ccclass
   * @_decorator.uniquelyReferenced
   * class Foo { }
   *
   * @_decorator.ccclass
   * class Bar {
   *   @_decorator.property
   *   public foo = new Foo();
   * }
   *
   * const bar1 = new Bar();
   * const bar2 = new Bar();
   * bar2.foo = bar1.foo; // 由程序逻辑让它们引用同一个对象
   * ```
   * `bar1` 和 `bar2` 引用同一个 `Foo` 对象。
   * 但在反序列化之后，`bar1.foo === bar2.foo` 永不成立。
   */


  _export("formerlySerializedAs", formerlySerializedAs);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_utilsJs) {
      emptyDecorator = _utilsJs.emptyDecorator;
    }, function (_propertyJs) {
      getOrCreatePropertyStash = _propertyJs.getOrCreatePropertyStash;
    }, function (_classStashJs) {
      PropertyStashInternalFlag = _classStashJs.PropertyStashInternalFlag;
    }, function (_serializationMetadataJs) {
      getOrCreateSerializationMetadata = _serializationMetadataJs.getOrCreateSerializationMetadata;
    }],
    execute: function () {
      /**
       * True if the serialization feature is enabled in the current environment.
       * @engineInternal
       */
      WITH_SERIALIZATION = EDITOR || TEST;
      /**
       * @engineInternal
       */

      _export("serializable", serializable = (target, propertyKey, descriptorOrInitializer) => {
        const propertyStash = getOrCreatePropertyStash(target, propertyKey, descriptorOrInitializer);
        setImplicitSerializable(propertyStash);
      });

      _export("editorOnly", editorOnly = (target, propertyKey, descriptorOrInitializer) => {
        const propertyStash = getOrCreatePropertyStash(target, propertyKey, descriptorOrInitializer);
        propertyStash.editorOnly = true;
        setImplicitSerializable(propertyStash);
      });

      _export("uniquelyReferenced", uniquelyReferenced = !WITH_SERIALIZATION ? emptyDecorator // eslint-disable-next-line func-names, @typescript-eslint/ban-types
      : function uniquelyReferenced(constructor) {
        const metadata = getOrCreateSerializationMetadata(constructor);
        metadata.uniquelyReferenced = true;
      });
    }
  };
});