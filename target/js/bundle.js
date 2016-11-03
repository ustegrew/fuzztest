var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    /**
     * @author peter
     */
    var TMain = (function () {
        function TMain() {
        }
        /**
         * @param args
         */
        TMain.main = function (args) {
            fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.CreateType();
        };
        return TMain;
    }());
    fuzztest.TMain = TMain;
    TMain["__classname"] = "fuzztest.TMain";
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var _dev_concepts;
    (function (_dev_concepts) {
        var grammar;
        (function (grammar) {
            var build;
            (function (build) {
                /**
                 * Concept test: Build grammar tree
                 *
                 * @author peter
                 */
                var TDevBuildGrammar_01 = (function () {
                    function TDevBuildGrammar_01() {
                    }
                    TDevBuildGrammar_01.TestTree01 = function () {
                        var s;
                        var cc;
                        var p;
                        cc = new fuzztest.generator.rule.cClass.TCharacterClass();
                        cc.AddRange("a", "z");
                        cc.AddRange("0", "9");
                        cc.AddPoint("_");
                        fuzztest.generator.rule.VNode.ClearVisitCounters();
                        s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kFollowRule, 10);
                        for (var i = 1; i <= 50; i++) {
                            p = cc.CreateData(s, "");
                            java.lang.System.out.print(p);
                        }
                        console.info();
                        fuzztest.generator.rule.VNode.ClearVisitCounters();
                        s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kInjectInvalids, 10);
                        for (var i = 1; i <= 50; i++) {
                            p = cc.CreateData(s, "");
                            java.lang.System.out.print(p);
                        }
                        console.info();
                    };
                    return TDevBuildGrammar_01;
                }());
                build.TDevBuildGrammar_01 = TDevBuildGrammar_01;
                TDevBuildGrammar_01["__classname"] = "fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01";
            })(build = grammar.build || (grammar.build = {}));
        })(grammar = _dev_concepts.grammar || (_dev_concepts.grammar = {}));
    })(_dev_concepts = fuzztest._dev_concepts || (fuzztest._dev_concepts = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var utils;
    (function (utils) {
        var store;
        (function (store) {
            /**
             * A poor man's implementation of java.util.ArrayList. I could try and import j4ts, but I got loads of
             * transpilation errors. I have a feeling that writing this impl is getting faster results than
             * trying to make j4ts to work.
             *
             * @author peter
             */
            var TArrayList = (function () {
                function TArrayList() {
                    this.fNumElements = 0;
                    this.fElements = (new Array());
                    this.fNumElements = 0;
                }
                TArrayList.prototype.Add = function (obj) {
                    this.fElements.push(obj);
                    this.fNumElements++;
                };
                TArrayList.prototype.Get = function (i) {
                    var ret;
                    this._AssertIndexOK(i);
                    ret = this.fElements[i];
                    return ret;
                };
                TArrayList.prototype.GetNumElements = function () {
                    return this.fNumElements;
                };
                TArrayList.prototype._AssertIndexOK = function (i) {
                    if (i < 0 || i >= this.fNumElements) {
                        throw new Error("Index out of bounds. Must be in [0, " + this.fNumElements + "[. Given: " + i);
                    }
                };
                return TArrayList;
            }());
            store.TArrayList = TArrayList;
            TArrayList["__classname"] = "fuzztest.utils.store.TArrayList";
        })(store = utils.store || (utils.store = {}));
    })(utils = fuzztest.utils || (fuzztest.utils = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var utils;
    (function (utils) {
        var store;
        (function (store) {
            /**
             * A poor man's implementation of java.util.HashMap. I could try and import j4ts, but I got loads of
             * transpilation errors. I have a feeling that writing this impl is getting faster results than
             * trying to make j4ts to work.
             *
             * @author peter
             */
            var THashMap = (function () {
                function THashMap() {
                    this.fNumElements = 0;
                    this.fElements = new Object();
                    this.fNumElements = 0;
                }
                THashMap.prototype.Get = function (key) {
                    var ret;
                    this._AssertHasElement(key, false);
                    ret = this.fElements[key];
                    return ret;
                };
                THashMap.prototype.GetNumElements = function () {
                    return this.fNumElements;
                };
                THashMap.prototype.HasElement = function (key) {
                    var ret;
                    ret = this.fElements.hasOwnProperty(key);
                    return ret;
                };
                THashMap.prototype.Set = function (key, obj) {
                    this._AssertHasElement(key, true);
                    this.fElements[key] = obj;
                    this.fNumElements++;
                };
                THashMap.prototype._AssertHasElement = function (key, doInverse) {
                    var hasElement;
                    hasElement = this.fElements.hasOwnProperty(key);
                    if (doInverse) {
                        if (hasElement) {
                            throw new Error("Duplicate key: \'" + key + "\'");
                        }
                    }
                    else {
                        if (!hasElement) {
                            throw new Error("Unknown key: \'" + key + "\'");
                        }
                    }
                };
                return THashMap;
            }());
            store.THashMap = THashMap;
            THashMap["__classname"] = "fuzztest.utils.store.THashMap";
        })(store = utils.store || (utils.store = {}));
    })(utils = fuzztest.utils || (fuzztest.utils = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var utils;
    (function (utils) {
        var store;
        (function (store) {
            /**
             * @author peter
             */
            var TArrayMap = (function () {
                function TArrayMap() {
                    this.fHashMap = (new fuzztest.utils.store.THashMap());
                    this.fArrayList = (new fuzztest.utils.store.TArrayList());
                }
                TArrayMap.prototype.Add = function (key, obj) {
                    this.fHashMap.Set(key, obj);
                    this.fArrayList.Add(obj);
                };
                TArrayMap.prototype.Get = function (key) {
                    var _this = this;
                    if (((typeof key === 'string') || key === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        return (function () {
                            var ret;
                            ret = _this.fHashMap.Get(key);
                            return ret;
                        })();
                    }
                    else if (((typeof key === 'number') || key === null)) {
                        return this.Get$int(key);
                    }
                    else
                        throw new Error('invalid overload');
                };
                TArrayMap.prototype.Get$int = function (i) {
                    var ret;
                    ret = this.fArrayList.Get(i);
                    return ret;
                };
                TArrayMap.prototype.GetNumElements = function () {
                    var ret;
                    ret = this.fArrayList.GetNumElements();
                    return ret;
                };
                TArrayMap.prototype.HasElement = function (key) {
                    var ret;
                    ret = this.fHashMap.HasElement(key);
                    return ret;
                };
                return TArrayMap;
            }());
            store.TArrayMap = TArrayMap;
            TArrayMap["__classname"] = "fuzztest.utils.store.TArrayMap";
        })(store = utils.store || (utils.store = {}));
    })(utils = fuzztest.utils || (fuzztest.utils = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        /**
         * The central repository holding references to all {@link VBrowseable} objects.
         * Implemented as global singleton, i.e. anyone can query the repository for stored
         * objects.
         * Each object is identified by key and by index. Indices are zero based and follow
         * append order, i.e. the object appended first has index zero, next object has index one etc.
         *
         * @author peter
         */
        var TRepository = (function () {
            function TRepository() {
                this.fRepository = (new fuzztest.utils.store.TArrayMap());
            }
            /**
             * Adds an object to the repository. The object must have it's key property set prior to adding.
             *
             * @param   b                           The object to be stored.
             * @return                              The stored object's key.
             * @throws  IllegalArgumentException    if the object's key isn't set or there's already another object
             * stored with the same key.
             */
            TRepository.Add = function (b) {
                var ret;
                TRepository._CreateRepository();
                ret = TRepository.gRepository._Add(b);
                return ret;
            };
            /**
             * Returns the object with the given index.
             *
             * @param   i   Index of the object requested.
             * @return      Object being requested.
             * @throws  IllegalArgumentException if the index is out of range.
             */
            TRepository.Get$int = function (i) {
                var ret;
                TRepository._CreateRepository();
                ret = TRepository.gRepository._GetElement(i);
                return ret;
            };
            /**
             * Returns the object with the given key.
             *
             * @param   key     Key of the object requested.
             * @return          Object being requested.
             * @throws  IllegalArgumentException if the key has an invalid value or
             * there isn't any object with that key.
             */
            TRepository.Get = function (key) {
                if (((typeof key === 'string') || key === null)) {
                    var __args = Array.prototype.slice.call(arguments);
                    return (function () {
                        var ret;
                        TRepository._CreateRepository();
                        ret = TRepository.gRepository._GetElement(key);
                        return ret;
                    })();
                }
                else if (((typeof key === 'number') || key === null)) {
                    return fuzztest.generator.TRepository.Get$int(key);
                }
                else
                    throw new Error('invalid overload');
            };
            /**
             * Returns a list of keys of objects that are of the same class as the given {@link VBrowseable}.
             *
             * @param   b   The {@link VBrowseable} whose class we are querying.
             * @return      A list of keys of objects that are of the given class.
             */
            TRepository.GetKeys$fuzztest_generator_classing_TClass = function (c) {
                var ret;
                TRepository._CreateRepository();
                ret = TRepository.gRepository._GetKeys(c, true);
                return ret;
            };
            /**
             * Returns a list of keys of objects that are of the same or parent class as the given {@link VBrowseable}.
             *
             * @param   b           The {@link VBrowseable} whose class we are querying.
             * @param   isStrict    If <code>true</code>, we filter for objects that have <i>exactly</i>
             * the same class as the given {@link VBrowseable}. If <code>false</code>,
             * we also accept objects of a class that is in the given object's parent
             * chain.
             * @return              A list of keys of objects that are of the given class, or a parent class thereof.
             */
            TRepository.GetKeys = function (c, isStrict) {
                if (((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && ((typeof isStrict === 'boolean') || isStrict === null)) {
                    var __args = Array.prototype.slice.call(arguments);
                    return (function () {
                        var ret;
                        TRepository._CreateRepository();
                        ret = TRepository.gRepository._GetKeys(c, isStrict);
                        return ret;
                    })();
                }
                else if (((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && isStrict === undefined) {
                    return fuzztest.generator.TRepository.GetKeys$fuzztest_generator_classing_TClass(c);
                }
                else
                    throw new Error('invalid overload');
            };
            /**
             * @return  The number of objects stored in the repository.
             */
            TRepository.GetNumElements = function () {
                var ret;
                TRepository._CreateRepository();
                ret = TRepository.gRepository._GetNumElements();
                return ret;
            };
            /**
             * Returns <code>true</code> if there is an object with the given key, <code>false</code> otherwise.
             *
             * @param   key     The key being queried
             * @return          <code>true</code> if there is an object with the given
             * key, <code>false</code> otherwise.
             */
            TRepository.HasElement = function (key) {
                var ret;
                TRepository._CreateRepository();
                ret = TRepository.gRepository._HasElement(key);
                return ret;
            };
            /**
             * Creates a new repository (singleton) if none existed before.
             */
            TRepository._CreateRepository = function () {
                if (TRepository.gRepository == null) {
                    TRepository.gRepository = new TRepository();
                }
            };
            TRepository.prototype._Add = function (b) {
                var key;
                key = b.GetKey();
                this.fRepository.Add(key, b);
                return key;
            };
            TRepository.prototype._GetElement$int = function (i) {
                var ret;
                ret = this.fRepository.Get(i);
                return ret;
            };
            TRepository.prototype._GetElement = function (key) {
                var _this = this;
                if (((typeof key === 'string') || key === null)) {
                    var __args = Array.prototype.slice.call(arguments);
                    return (function () {
                        var ret;
                        ret = _this.fRepository.Get(key);
                        return ret;
                    })();
                }
                else if (((typeof key === 'number') || key === null)) {
                    return this._GetElement$int(key);
                }
                else
                    throw new Error('invalid overload');
            };
            TRepository.prototype._GetKeys = function (c, isStrict) {
                var i;
                var n;
                var b0;
                var c0;
                var isClass;
                var key;
                var ret;
                ret = (new fuzztest.utils.store.TArrayList());
                n = this.fRepository.GetNumElements();
                if (n >= 1) {
                    for (i = 0; i < n; i++) {
                        b0 = this.fRepository.Get(i);
                        c0 = b0.GetClass();
                        isClass = isStrict ? c.IsEqualTo(c0) : c.IsEqualToOrDerivedFrom(c0);
                        if (isClass) {
                            key = b0.GetKey();
                            ret.Add(key);
                        }
                    }
                }
                return ret;
            };
            TRepository.prototype._GetNumElements = function () {
                var ret;
                ret = this.fRepository.GetNumElements();
                return ret;
            };
            TRepository.prototype._HasElement = function (key) {
                var ret;
                ret = this.fRepository.HasElement(key);
                return ret;
            };
            TRepository.gRepository = null;
            return TRepository;
        }());
        generator.TRepository = TRepository;
        TRepository["__classname"] = "fuzztest.generator.TRepository";
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var primitive;
        (function (primitive) {
            /**
             * @author peter
             */
            var TOnceAssignable = (function () {
                function TOnceAssignable() {
                    this.fElement = null;
                }
                TOnceAssignable.prototype.Set = function (element) {
                    if (this.fElement != null) {
                        throw new java.lang.IllegalArgumentException("Element can only be set once.");
                    }
                    this.fElement = element;
                };
                TOnceAssignable.prototype.Get = function () {
                    if (this.fElement == null) {
                        throw new java.lang.IllegalStateException("Cannot retrieve unset element.");
                    }
                    return this.fElement;
                };
                return TOnceAssignable;
            }());
            primitive.TOnceAssignable = TOnceAssignable;
            TOnceAssignable["__classname"] = "fuzztest.generator.primitive.TOnceAssignable";
        })(primitive = generator.primitive || (generator.primitive = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        /**
         * Browseable object, i.e. can be stored in the {@link TRepository}. Provides
         * manual and automatic key generation.
         *
         * @author peter
         */
        var VBrowseable = (function () {
            /**
             * cTor.
             */
            function VBrowseable() {
                this.fClass = fuzztest.generator.classing.TClass.Create(this);
                this.fKey = null;
            }
            /**
             * Creates a generic {@link TClass} from this abstract class.
             * Use case: {@link TRepository} Query with abstract base class as
             * query criterion.
             *
             * Thankfully, Java allows us to create anonymous instances of
             * abstract classes, otherwise it would be hard to instantiate
             * a {@link TClass} from an abstract class.
             *
             * Note that each abstract sub class must override this method!
             *
             * @return      A generic class object for this class.
             */
            VBrowseable.CreateType = function () {
                var ret;
                ret = (new VBrowseable.VBrowseableType()).GetClass().GetParent();
                return ret;
            };
            VBrowseable.prototype.GetClass = function () {
                return this.fClass;
            };
            /**
             * @return      The key associated with this object.
             */
            VBrowseable.prototype.GetKey = function () {
                return this.fKey;
            };
            VBrowseable.prototype._Register = function (key, doAutoKey) {
                if (key === void 0) { key = null; }
                if (doAutoKey === void 0) { doAutoKey = true; }
                var k;
                if (this.fKey != null) {
                    throw new java.lang.IllegalArgumentException("Key is already assigned.");
                }
                if (doAutoKey) {
                    k = this.fClass.GetName();
                    VBrowseable.gCounter++;
                    this.fKey = k + "_" + VBrowseable.gCounter;
                }
                else {
                    this.fKey = key;
                }
                fuzztest.generator.TRepository.Add(this);
            };
            VBrowseable.gCounter = -1;
            return VBrowseable;
        }());
        generator.VBrowseable = VBrowseable;
        VBrowseable["__classname"] = "fuzztest.generator.VBrowseable";
        var VBrowseable;
        (function (VBrowseable) {
            var VBrowseableType = (function (_super) {
                __extends(VBrowseableType, _super);
                function VBrowseableType() {
                    _super.apply(this, arguments);
                }
                return VBrowseableType;
            }(fuzztest.generator.VBrowseable));
            VBrowseable.VBrowseableType = VBrowseableType;
            VBrowseableType["__classname"] = "fuzztest.generator.VBrowseable.VBrowseableType";
        })(VBrowseable = generator.VBrowseable || (generator.VBrowseable = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var classing;
        (function (classing) {
            /**
             * @author peter
             */
            var TInheritChain = (function () {
                function TInheritChain() {
                    this.fChain = (new fuzztest.utils.store.TArrayMap());
                }
                TInheritChain.prototype.GetAsString$ = function () {
                    var ret;
                    ret = this._GetAsString(false);
                    return ret;
                };
                TInheritChain.prototype.GetAsString = function (isDetailed) {
                    var _this = this;
                    if (((typeof isDetailed === 'boolean') || isDetailed === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        return (function () {
                            var ret;
                            ret = _this._GetAsString(isDetailed);
                            return ret;
                        })();
                    }
                    else if (isDetailed === undefined) {
                        return this.GetAsString$();
                    }
                    else
                        throw new Error('invalid overload');
                };
                /**
                 * Returns the i-th parent in this inheritance chain.
                 *
                 * @param   i   The number of generations above. Zero is the the referred class itself,
                 * 1 (one) the first parent generation etc.
                 * @return      The parent class that it i generations above the class hosting this chain.
                 */
                TInheritChain.prototype.GetLink = function (i) {
                    var ret;
                    ret = this.fChain.Get(i);
                    return ret;
                };
                TInheritChain.prototype.GetNumLinks = function () {
                    var ret;
                    ret = this.fChain.GetNumElements();
                    return ret;
                };
                TInheritChain.prototype.IsLink = function (c) {
                    var i;
                    var n;
                    var c0;
                    var cID;
                    var cID0;
                    var ret;
                    ret = false;
                    n = this.fChain.GetNumElements();
                    if (n >= 1) {
                        for (i = 0; i < n; i++) {
                            c0 = this.fChain.Get(i);
                            cID = c.GetCanonicalPath();
                            cID0 = c0.GetCanonicalPath();
                            ret = ret || (cID === cID0);
                        }
                    }
                    return ret;
                };
                TInheritChain.prototype.Add = function (c) {
                    var key;
                    key = c.GetName();
                    this.fChain.Add(key, c);
                };
                TInheritChain.prototype._GetAsString = function (isDetailed) {
                    var i;
                    var n;
                    var c;
                    var pSep;
                    var ret;
                    pSep = isDetailed ? "\n" : TInheritChain.kPathSeparator;
                    ret = "";
                    n = this.fChain.GetNumElements();
                    if (n >= 1) {
                        for (i = n - 1; i >= 0; i--) {
                            c = this.fChain.Get(i);
                            ret += isDetailed ? c.GetCanonicalPath() : c.GetName();
                            if (i > 0) {
                                ret += pSep;
                            }
                        }
                    }
                    return ret;
                };
                TInheritChain.kPathSeparator = ".";
                return TInheritChain;
            }());
            classing.TInheritChain = TInheritChain;
            TInheritChain["__classname"] = "fuzztest.generator.classing.TInheritChain";
        })(classing = generator.classing || (generator.classing = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var classing;
        (function (classing) {
            /**
             * @author peter
             */
            var TClass = (function () {
                function TClass(obj) {
                    var proto;
                    var constr;
                    var cls;
                    var cPath;
                    this.fCanonicalPath = TClass.kNullID;
                    this.fName = TClass.kNullID;
                    this.fInheritPath = TClass.kNullID;
                    this.fInherits = new fuzztest.generator.classing.TInheritChain();
                    proto = null;
                    if (obj != null) {
                        proto = obj["__proto__"];
                        if (proto != null) {
                            constr = proto["constructor"];
                            if (constr != null) {
                                this.fName = constr["name"];
                                this.fInherits.Add(this);
                                while ((proto != null)) {
                                    cls = new TClass(proto);
                                    proto = proto["__proto__"];
                                    if (proto != null) {
                                        this.fInherits.Add(cls);
                                    }
                                }
                                ;
                                this.fInheritPath = this.fInherits.GetAsString();
                            }
                        }
                    }
                    proto = Object.getPrototypeOf(obj);
                    if (proto != null) {
                        constr = proto["constructor"];
                        if (constr != null) {
                            cPath = constr["__classname"];
                            if (cPath != null) {
                                this.fCanonicalPath = cPath;
                            }
                        }
                    }
                }
                TClass.Create = function (obj) {
                    var obj0;
                    var ret;
                    obj0 = obj;
                    ret = new TClass(obj0);
                    return ret;
                };
                TClass.prototype.GetName = function () {
                    return this.fName;
                };
                TClass.prototype.GetCanonicalPath = function () {
                    return this.fCanonicalPath;
                };
                TClass.prototype.GetInheritPath$ = function () {
                    return this.fInheritPath;
                };
                TClass.prototype.GetInheritPath = function (isDetailed) {
                    var _this = this;
                    if (((typeof isDetailed === 'boolean') || isDetailed === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        return (function () {
                            var ret;
                            ret = _this.fInherits.GetAsString(isDetailed);
                            return ret;
                        })();
                    }
                    else if (isDetailed === undefined) {
                        return this.GetInheritPath$();
                    }
                    else
                        throw new Error('invalid overload');
                };
                TClass.prototype.GetParent = function () {
                    var nLinks;
                    var ret;
                    nLinks = this.fInherits.GetNumLinks();
                    ret = null;
                    if (nLinks >= 2) {
                        ret = this.fInherits.GetLink(1);
                    }
                    return ret;
                };
                TClass.prototype.IsEqualTo = function (other) {
                    var ret;
                    ret = this._IsEqualTo(other);
                    return ret;
                };
                TClass.prototype.IsEqualToOrDerivedFrom = function (other) {
                    var isEq;
                    var isDer;
                    var ret;
                    isEq = this._IsEqualTo(other);
                    isDer = this.fInherits.IsLink(other);
                    ret = isEq || isDer;
                    return ret;
                };
                TClass.prototype._IsEqualTo = function (other) {
                    var ret;
                    ret = (this.fCanonicalPath === other.fCanonicalPath);
                    return ret;
                };
                TClass.kNullID = "anonymous";
                return TClass;
            }());
            classing.TClass = TClass;
            TClass["__classname"] = "fuzztest.generator.classing.TClass";
        })(classing = generator.classing || (generator.classing = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var cClass;
            (function (cClass) {
                /**
                 * @author peter
                 */
                var VCharSet = (function () {
                    function VCharSet() {
                    }
                    return VCharSet;
                }());
                cClass.VCharSet = VCharSet;
                VCharSet["__classname"] = "fuzztest.generator.rule.cClass.VCharSet";
            })(cClass = rule.cClass || (rule.cClass = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            /**
             * Code generation strategies.
             *
             * @author peter
             */
            (function (ERuleAdhesion) {
                ERuleAdhesion[ERuleAdhesion["kFollowRule"] = 0] = "kFollowRule";
                ERuleAdhesion[ERuleAdhesion["kInjectInvalids"] = 1] = "kInjectInvalids";
                ERuleAdhesion[ERuleAdhesion["kFollowOpposite"] = 2] = "kFollowOpposite";
            })(rule.ERuleAdhesion || (rule.ERuleAdhesion = {}));
            var ERuleAdhesion = rule.ERuleAdhesion;
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            /**
             * @author peter
             */
            var TStrategy = (function () {
                function TStrategy(recursionMax, ruleAdhesion, repeatMax) {
                    this.fRecursionCounter = 0;
                    this.fRecursionMax = 0;
                    this.fRepeatMax = 0;
                    this._AssertParamsOK(recursionMax, ruleAdhesion, repeatMax);
                    this.fRecursionMax = recursionMax;
                    this.fRuleAdhesion = ruleAdhesion;
                    this.fRepeatMax = repeatMax;
                }
                /**
                 * @return
                 */
                TStrategy.prototype.CanEnter = function () {
                    var ret;
                    ret = (this.fRecursionCounter <= this.fRecursionMax);
                    return ret;
                };
                TStrategy.prototype.GetRuleAdhesion = function () {
                    return this.fRuleAdhesion;
                };
                TStrategy.prototype.GetNumRepeatsMax = function () {
                    return this.fRepeatMax;
                };
                TStrategy.prototype.GetNumVisitsMax = function () {
                    return this.fRecursionMax;
                };
                TStrategy.prototype._AssertParamsOK = function (recursionMax, ruleAdhesion, repeatMax) {
                    console.info("Warning: TStrategy::_AssertParamsOK(...): Must implement.");
                };
                return TStrategy;
            }());
            rule.TStrategy = TStrategy;
            TStrategy["__classname"] = "fuzztest.generator.rule.TStrategy";
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     * RandomElement is an abstract class that encapsulates random number
                     * generators. To base a class on it, you must define the method
                     * <CODE>raw()</CODE> as described below. It is also likely that you will want
                     * to define a constructor or another mechanism for seeding the the generator.
                     * The other classes defined in <CODE>RandomElement</CODE> add value to the
                     * numbers generated by <CODE>raw()</CODE>
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/RandomElement.java">
                     * Source code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     *
                     * @see RandomJava
                     * @see RandomShuffle
                     */
                    var RandomElement = (function () {
                        function RandomElement() {
                        }
                        /**
                         * The abstract method that must be defined to make a working RandomElement.
                         * See the class <CODE>RandomJava</CODE> for an example of how to do this.
                         *
                         * @see RandomJava
                         *
                         * @return a random double in the range [0,1]
                         */
                        RandomElement.prototype.raw$ = function () { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); };
                        /**
                         * Fill part or all of an array with doubles. The method defined here uses
                         * multiple calls to <CODE>raw()</CODE> to fill the array. You can eliminate
                         * the overhead of multiple method calls by subclassing this with a version
                         * of the generator that fills the array. On our system this improves the
                         * efficiency of <CODE>Ranecu</CODE> by 20% when filling large arrays.
                         *
                         *
                         * @param d
                         * array to be filled with doubles
                         * @param n
                         * number of doubles to generate
                         */
                        RandomElement.prototype.raw = function (d, n) {
                            var _this = this;
                            if (((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    for (var i = 0; i < n; i++)
                                        d[i] = _this.raw();
                                })();
                            }
                            else if (((d != null && d instanceof Array) || d === null) && n === undefined) {
                                return this.raw$double_A(d);
                            }
                            else if (d === undefined && n === undefined) {
                                return this.raw$();
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         * Fill an entire array with doubles. This method calls
                         * <CODE>raw(double d[],int n)</CODE> with <CODE>d=d.length</CODE>. Since
                         * this adds little overhead for <CODE>d.length</CODE> large, it is only
                         * necessary to override <CODE>raw(double d[],int n)</CODE>
                         *
                         * @param d
                         * array to be filled with doubles.
                         */
                        RandomElement.prototype.raw$double_A = function (d) {
                            this.raw(d, d.length);
                        };
                        /**
                         * @param hi
                         * upper limit of range
                         * @return a random integer in the range 1,2,... ,<STRONG>hi</STRONG>
                         */
                        RandomElement.prototype.choose$int = function (hi) {
                            return this.choose(1, hi);
                        };
                        /**
                         * @param lo
                         * lower limit of range
                         * @param hi
                         * upper limit of range
                         * @return a random integer in the range <STRONG>lo</STRONG>,
                         * <STRONG>lo</STRONG>+1, ... ,<STRONG>hi</STRONG>
                         */
                        RandomElement.prototype.choose = function (lo, hi) {
                            var _this = this;
                            if (((typeof lo === 'number') || lo === null) && ((typeof hi === 'number') || hi === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    var value = lo + (((hi - lo) * _this.raw()) | 0);
                                    if (value > hi)
                                        value = hi;
                                    return value;
                                })();
                            }
                            else if (((typeof lo === 'number') || lo === null) && hi === undefined) {
                                return this.choose$int(lo);
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         * @return a boolean that's true 0.5 of the time; equivalent to coin(0.5).
                         */
                        RandomElement.prototype.coin$ = function () {
                            return this.raw() <= 0.5;
                        };
                        /**
                         * @param p
                         * probability that function will return true
                         * @return a boolean that's true p of the time.
                         */
                        RandomElement.prototype.coin = function (p) {
                            var _this = this;
                            if (((typeof p === 'number') || p === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    return _this.raw() <= p;
                                })();
                            }
                            else if (p === undefined) {
                                return this.coin$();
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         * @param lo
                         * lower limit of range
                         * @param hi
                         * upper limit of range
                         * @return a uniform random real in the range [<STRONG>lo</STRONG>,
                         * <STRONG>hi</STRONG>]
                         */
                        RandomElement.prototype.uniform = function (lo, hi) {
                            return (lo + (hi - lo) * this.raw());
                        };
                        /**
                         *
                         * generate a power-law distribution with exponent <CODE>alpha</CODE> and
                         * lower cutoff <CODE>cut</CODE> <CENTER> </CENTER>
                         *
                         * @param alpha
                         * the exponent
                         * @param cut
                         * the lower cutoff
                         */
                        RandomElement.prototype.powlaw = function (alpha, cut) {
                            return cut * Math.pow(this.raw(), 1.0 / (alpha + 1.0));
                        };
                        return RandomElement;
                    }());
                    RngPack.RandomElement = RandomElement;
                    RandomElement["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomElement";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var _dev_concepts;
    (function (_dev_concepts) {
        var objects;
        (function (objects) {
            var construct;
            (function (construct) {
                var from_abstract_class;
                (function (from_abstract_class) {
                    var trial_01;
                    (function (trial_01) {
                        /**
                         * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
                         * where we (currently) don't have abstract classes.
                         *
                         * @author peter
                         */
                        var TDevCreateObject_01 = (function () {
                            function TDevCreateObject_01() {
                            }
                            TDevCreateObject_01.CreateType = function () {
                                var c;
                                c = (new TDevCreateObject_01.VBrowseableType()).GetClass().GetParent();
                                console.log("Inheritence chain: " + c.GetInheritPath());
                                console.log("Canonical path:    " + c.GetCanonicalPath());
                            };
                            return TDevCreateObject_01;
                        }());
                        trial_01.TDevCreateObject_01 = TDevCreateObject_01;
                        TDevCreateObject_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01";
                        var TDevCreateObject_01;
                        (function (TDevCreateObject_01) {
                            var VBrowseableType = (function (_super) {
                                __extends(VBrowseableType, _super);
                                function VBrowseableType() {
                                    _super.apply(this, arguments);
                                }
                                return VBrowseableType;
                            }(fuzztest.generator.VBrowseable));
                            TDevCreateObject_01.VBrowseableType = VBrowseableType;
                            VBrowseableType["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01.VBrowseableType";
                        })(TDevCreateObject_01 = trial_01.TDevCreateObject_01 || (trial_01.TDevCreateObject_01 = {}));
                    })(trial_01 = from_abstract_class.trial_01 || (from_abstract_class.trial_01 = {}));
                })(from_abstract_class = construct.from_abstract_class || (construct.from_abstract_class = {}));
            })(construct = objects.construct || (objects.construct = {}));
        })(objects = _dev_concepts.objects || (_dev_concepts.objects = {}));
    })(_dev_concepts = fuzztest._dev_concepts || (fuzztest._dev_concepts = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            /**
             * @author peter
             */
            var VNode = (function (_super) {
                __extends(VNode, _super);
                function VNode(key) {
                    var _this = this;
                    if (((typeof key === 'string') || key === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        _super.call(this);
                        this.fNumVisits = 0;
                        (function () {
                            _this.fNumVisits = 0;
                            _this._Register(key);
                        })();
                    }
                    else if (key === undefined) {
                        var __args = Array.prototype.slice.call(arguments);
                        _super.call(this);
                        this.fNumVisits = 0;
                        (function () {
                            _this.fNumVisits = 0;
                            _this.fExpression = (new fuzztest.generator.primitive.TOnceAssignable());
                            _this._Register();
                        })();
                    }
                    else
                        throw new Error('invalid overload');
                }
                VNode.ClearVisitCounters = function () {
                    var i;
                    var n;
                    var k;
                    var nd;
                    var clVNode;
                    var keys;
                    clVNode = VNode.CreateType();
                    keys = fuzztest.generator.TRepository.GetKeys(clVNode, false);
                    n = keys.GetNumElements();
                    if (n >= 1) {
                        for (i = 0; i < n; i++) {
                            k = keys.Get(i);
                            nd = fuzztest.generator.TRepository.Get(k);
                            nd.ClearVisitCounter();
                        }
                    }
                };
                /**
                 * @see         VBrowseable#CreateType()
                 */
                VNode.CreateType = function () {
                    var ret;
                    ret = ((function (target) {
                        return target;
                    })(new VNode.VNodeType())).GetClass().GetParent();
                    return ret;
                };
                VNode.DoesFollowRule = function (s) {
                    var r;
                    var ret;
                    r = s.GetRuleAdhesion();
                    if (r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) {
                        ret = true;
                    }
                    else if (r === fuzztest.generator.rule.ERuleAdhesion.kFollowOpposite) {
                        ret = false;
                    }
                    else {
                        ret = fuzztest.utils.gen.TGenData.GetBoolean();
                    }
                    return ret;
                };
                VNode.prototype.ClearVisitCounter = function () {
                    this.fNumVisits = 0;
                };
                /**
                 * Creates a data fragment and appends it to the given head string.
                 *
                 * This method guards against descend going too deep
                 * (recursion limit).
                 *
                 * Please call this method from all sub classes as it provides
                 * the recursion limit.
                 *
                 * @param       s       The fragment creation strategy.
                 * @param       head    The head unto which we append the newly
                 * created fragment.
                 * @return      The newly assembled source code fragment.
                 */
                VNode.prototype.CreateData = function (s, head) {
                    var nVisitsMax;
                    var ret;
                    nVisitsMax = s.GetNumVisitsMax();
                    if (this.fNumVisits <= nVisitsMax) {
                        this.fNumVisits++;
                        ret = this._CreateData(s, head);
                    }
                    else {
                        ret = head;
                    }
                    return ret;
                };
                VNode.prototype.SetExpression = function (node) {
                    this.fExpression.Set(node);
                };
                /**
                 * Creates a data fragment from the concrete grammar artifact and
                 * appends it to the given head string.
                 *
                 * This is a default method, meant to be overridden by nodes that generate
                 * their own data. Nodes that don't generate data won't need to override
                 * this method.
                 *
                 * Concrete implementations of this class should not call this
                 * method directly, but should call {@link #CreateData(TStrategy, String)}.
                 *
                 * @param       s       The fragment creation strategy.
                 * @return              The data fragment for a particular test case.
                 */
                VNode.prototype._CreateData = function (s, head) {
                    var ex;
                    var ret;
                    ex = this.fExpression.Get();
                    ret = ex.CreateData(s, head);
                    return ret;
                };
                VNode.prototype._GetExpression = function () {
                    var ret;
                    ret = this.fExpression.Get();
                    return ret;
                };
                /**
                 * Returns either this node or a randomly chosen node different from
                 * this one, but of the same (concrete) class (i.e. another object of this class).
                 * For example, if this node is a {@linkplain TChoice}, then the chosen
                 * node will be a distinctly other {@linkplain TChoice} object.
                 * Object will be retrieved from the {@link TRepository}.
                 *
                 * The returned node will be used to randomly mix generation rules
                 * of the same kind.
                 *
                 * @param       s       The generating strategy. If it's
                 * {@link TStrategy#GetRuleAdhesion()} method
                 * returns {@link ERuleAdhesion#kFollowRule} then
                 * we will return this node. If the method
                 * returns {@link ERuleAdhesion#kInjectInvalids} then
                 * we will return a randomly chosen different node.
                 * @return              Concrete node of this class, either this one or
                 * distinctly different from this node.
                 */
                VNode.prototype._GetFromOppositeSet = function () {
                    var c;
                    var i;
                    var n;
                    var kThis;
                    var kOther;
                    var hasKey;
                    var isEqual;
                    var refs;
                    var ret;
                    kThis = this.GetKey();
                    c = this.GetClass();
                    refs = fuzztest.generator.TRepository.GetKeys(c);
                    n = refs.GetNumElements();
                    ret = null;
                    if (n >= 1) {
                        hasKey = false;
                        do {
                            i = fuzztest.utils.gen.TGenData.GetInt(n);
                            kOther = refs.Get(i);
                            isEqual = (kThis === kOther);
                            hasKey = !isEqual;
                        } while ((!hasKey));
                        ret = fuzztest.generator.TRepository.Get(kOther);
                    }
                    else {
                        ret = fuzztest.generator.TRepository.Get(kThis);
                    }
                    return ret;
                };
                return VNode;
            }(fuzztest.generator.VBrowseable));
            rule.VNode = VNode;
            VNode["__classname"] = "fuzztest.generator.rule.VNode";
            var VNode;
            (function (VNode) {
                var VNodeType = (function (_super) {
                    __extends(VNodeType, _super);
                    function VNodeType() {
                        _super.apply(this, arguments);
                    }
                    return VNodeType;
                }(fuzztest.generator.rule.VNode));
                VNode.VNodeType = VNodeType;
                VNodeType["__classname"] = "fuzztest.generator.rule.VNode.VNodeType";
            })(VNode = rule.VNode || (rule.VNode = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var cClass;
            (function (cClass) {
                /**
                 * @author peter
                 */
                var TCharacterRange = (function (_super) {
                    __extends(TCharacterRange, _super);
                    function TCharacterRange(loChar, hiChar) {
                        _super.call(this);
                        this.fHiChar = null;
                        this.fLoChar = null;
                        this._AssertOk(loChar, hiChar);
                        this.fLoChar = loChar.charAt(0);
                        this.fHiChar = hiChar.charAt(0);
                    }
                    TCharacterRange.prototype.GetChar = function (s) {
                        var doFollow;
                        var doHead;
                        var loChar;
                        var hiChar;
                        var ret;
                        doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
                        if (doFollow) {
                            ret = fuzztest.utils.gen.TGenData.GetChar(this.fLoChar, this.fHiChar);
                        }
                        else {
                            if (this.fLoChar === '\u0000' && this.fHiChar === '\uffff') {
                                ret = fuzztest.utils.gen.TGenData.GetChar();
                            }
                            else if (this.fLoChar === '\u0000') {
                                loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                                ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                            }
                            else if (this.fHiChar === '\uffff') {
                                hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                                ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                            }
                            else {
                                doHead = fuzztest.utils.gen.TGenData.GetBoolean();
                                if (doHead) {
                                    hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                                    ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                                }
                                else {
                                    loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                                }
                            }
                        }
                        return ret;
                    };
                    /**
                     * @param loChar
                     * @param hiChar
                     */
                    TCharacterRange.prototype._AssertOk = function (loChar, hiChar) {
                        var l1;
                        var l2;
                        var order;
                        l1 = loChar.length;
                        l2 = hiChar.length;
                        order = hiChar.localeCompare(loChar);
                        if (l1 !== 1) {
                            throw new java.lang.IllegalArgumentException("For loChar: Use string of length 1 (single character string).");
                        }
                        if (l2 !== 1) {
                            throw new java.lang.IllegalArgumentException("For hiChar: Use string of length 1 (single character string).");
                        }
                        if (order <= 0) {
                            throw new java.lang.IllegalArgumentException("loChar must lexically precede hiChar.");
                        }
                    };
                    return TCharacterRange;
                }(fuzztest.generator.rule.cClass.VCharSet));
                cClass.TCharacterRange = TCharacterRange;
                TCharacterRange["__classname"] = "fuzztest.generator.rule.cClass.TCharacterRange";
            })(cClass = rule.cClass || (rule.cClass = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var cClass;
            (function (cClass) {
                /**
                 * @author peter
                 */
                var TCharacterPoint = (function (_super) {
                    __extends(TCharacterPoint, _super);
                    function TCharacterPoint(ch) {
                        _super.call(this);
                        this.fChar = null;
                        this._AssertOK(ch);
                        this.fChar = ch.charAt(0);
                    }
                    TCharacterPoint.prototype.GetChar = function (s) {
                        var doFollow;
                        var doHead;
                        var loChar;
                        var hiChar;
                        var ret;
                        doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
                        if (doFollow) {
                            ret = this.fChar;
                        }
                        else {
                            if (this.fChar === '\u0000') {
                                loChar = '\u0001';
                                hiChar = '\uffff';
                                ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                            }
                            else if (this.fChar === '\uffff') {
                                loChar = '\u0000';
                                hiChar = '\ufffe';
                                ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                            }
                            else {
                                doHead = fuzztest.utils.gen.TGenData.GetBoolean();
                                if (doHead) {
                                    loChar = '\u0000';
                                    hiChar = String.fromCharCode(((this.fChar).charCodeAt(0) - 1));
                                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                                }
                                else {
                                    loChar = String.fromCharCode(((this.fChar).charCodeAt(0) + 1));
                                    hiChar = ('\uffff');
                                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                                }
                            }
                        }
                        return ret;
                    };
                    /**
                     * @param ch
                     */
                    TCharacterPoint.prototype._AssertOK = function (ch) {
                        var l;
                        l = ch.length;
                        if (l !== 1) {
                            throw new java.lang.IllegalArgumentException("For ch: Use string of length 1 (single character string).");
                        }
                    };
                    return TCharacterPoint;
                }(fuzztest.generator.rule.cClass.VCharSet));
                cClass.TCharacterPoint = TCharacterPoint;
                TCharacterPoint["__classname"] = "fuzztest.generator.rule.cClass.TCharacterPoint";
            })(cClass = rule.cClass || (rule.cClass = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     * RandomShuffle uses one random number generator to shuffle the numbers
                     * produced by another to obliterate sequential correlations. To initialize a
                     * RandomShuffle, pass it two RandomElements. The first RandomElement is used to
                     * generate a table of random numbers and the second is used to choose one from
                     * the table. An example of usage is,
                     *
                     * <PRE>
                     * RandomElement markov=new RandomShuffle(new Ranecu(),new Ranmar(),32)
                     * </PRE>
                     *
                     * which would generate a deck of 32 numbers from <TT>RANECU</TT> and use
                     * <TT>RANMAR</TT> to choose from the deck.
                     *
                     * <BR>
                     * <B>References:</B>
                     * <UL>
                     * <LI>F. James; <CITE>Comp. Phys. Comm.</CITE> <STRONG>60</STRONG> (1990) p
                     * 329-344
                     * <LI>D. Knuth; <CITE>The Art of Computer Programming</CITE> vol. 2, sec 3.2.2
                     * </UL>
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/RandomShuffle.java">
                     * Source code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     */
                    var RandomShuffle = (function (_super) {
                        __extends(RandomShuffle, _super);
                        /**
                         * @param ga
                         * generator to fill shuffle deck
                         * @param gb
                         * geberator to choose from shuffle deck
                         * @param ds
                         * the size of the shuffle deck
                         */
                        function RandomShuffle(ga, gb, ds) {
                            _super.call(this);
                            this.decksize = 0;
                            this.generatorA = ga;
                            this.generatorB = gb;
                            this.decksize = ds;
                            this.stackdeck();
                        }
                        /**
                         * The generator.
                         *
                         * @see RandomElement#raw
                         */
                        RandomShuffle.prototype.raw$ = function () {
                            var random;
                            var i;
                            i = this.generatorB.choose(0, this.decksize - 1);
                            random = this.deck[i];
                            this.deck[i] = this.generatorA.raw();
                            return random;
                        };
                        RandomShuffle.prototype.stackdeck = function () {
                            var i;
                            this.deck = new Array(this.decksize);
                            for (i = 0; i < this.decksize; i++)
                                this.deck[i] = this.generatorA.raw();
                        };
                        return RandomShuffle;
                    }(edu.cornell.lassp.houle.RngPack.RandomElement));
                    RngPack.RandomShuffle = RandomShuffle;
                    RandomShuffle["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomShuffle";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     * RandomJava is a class wrapper for the <CODE>Math.random()</CODE> generator
                     * that comes with Java. I know nothing about the quality of
                     * <CODE>Math.random()</CODE>, but I will warn the reader that system-supplied
                     * RNGs have a bad reputation; <TT>RandomJava</TT> is <B>NOT</B> reccomended for
                     * general use, it has only been included as a straightforward example of how to
                     * build a <CODE>RandomElement</CODE> wrapper for an existing RNG. The
                     * <TT>RANMAR</TT>, <TT>RANECU</TT> and <TT>RANLUX</TT> generators included in
                     * this package all appear to be faster than Math.random(); all three are
                     * well-studied, portable and proven in use.
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/RandomJava.java">
                     * Source code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/~houle/RngPack/"> Paul Houle </A>
                     * (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     * @see Ranmar
                     * @see Ranlux
                     * @see Ranecu
                     */
                    var RandomJava = (function (_super) {
                        __extends(RandomJava, _super);
                        function RandomJava() {
                            _super.apply(this, arguments);
                        }
                        /**
                         * Wrapper for <CODE>Math.random().</CODE>
                         *
                         * @see RandomElement#raw
                         */
                        RandomJava.prototype.raw$ = function () {
                            return Math.random();
                        };
                        return RandomJava;
                    }(edu.cornell.lassp.houle.RngPack.RandomElement));
                    RngPack.RandomJava = RandomJava;
                    RandomJava["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomJava";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     *
                     * <CODE>RandomSeedable</CODE> is an abstract class that extends the
                     * <CODE>RandomElement</CODE> class to include the ability to automatically
                     * generate a valid <CODE>long</CODE> seed from the clock. Thus it provides a
                     * consistent interface for seeding interchangable generators. It is reccomended
                     * that a <CODE>RandomSeedable</CODE> have a constructor that takes a
                     * <CODE>long</CODE> for a seed. For example, if you write a generator called
                     * <CODE>ReallyRandom</CODE>, you want to be able to do
                     *
                     * <PRE>
                     * long seed = ReallyRandom.ClockSeed ();
                     * RandomSeedable e = new ReallyRandom (seed);
                     * </PRE>
                     *
                     * this makes it convenient to keep a copy of the seed in case you want to
                     * restart the generator with the same seed some time in the future.
                     *
                     * <P>
                     * If one is going to use a long to generate a smaller seed by taking
                     * <CODE>Clockseed()</CODE> modulus another number, we reccomend that you use a
                     * prime number; this ensures that the generator would have the maximum "period"
                     * if it were started at regular issues, for instance, by a batch job. See
                     * <CODE>Ranmar</CODE> for an example.
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/RandomSeedable.java">
                     * Source code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     *
                     * @see Ranecu
                     * @see Ranlux
                     * @see Ranmar
                     */
                    var RandomSeedable = (function (_super) {
                        __extends(RandomSeedable, _super);
                        function RandomSeedable() {
                            _super.apply(this, arguments);
                        }
                        /**
                         *
                         * Return a long integer seed given a date
                         *
                         * @param d
                         * a date
                         * @return a long integer seed
                         */
                        RandomSeedable.ClockSeed = function (d) {
                            if (((d != null && d instanceof java.util.Date) || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    return d.getTime();
                                })();
                            }
                            else if (d === undefined) {
                                return edu.cornell.lassp.houle.RngPack.RandomSeedable.ClockSeed$();
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         *
                         * Return a long integer seed calculated from the date. Equivalent to
                         * <CODE>ClockSeed(new Date());
                         *
                         * @return a long integer seed
                         */
                        RandomSeedable.ClockSeed$ = function () {
                            return RandomSeedable.ClockSeed(new java.util.Date());
                        };
                        return RandomSeedable;
                    }(edu.cornell.lassp.houle.RngPack.RandomElement));
                    RngPack.RandomSeedable = RandomSeedable;
                    RandomSeedable["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomSeedable";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var _dev_concepts;
    (function (_dev_concepts) {
        var objects;
        (function (objects) {
            var construct;
            (function (construct) {
                var from_abstract_class;
                (function (from_abstract_class) {
                    var trial_01;
                    (function (trial_01) {
                        /**
                         * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
                         * where we (currently) don't have abstract classes.
                         *
                         * @author peter
                         */
                        var TDevCreateObject_02 = (function () {
                            function TDevCreateObject_02() {
                            }
                            TDevCreateObject_02.CreateType = function () {
                                var c;
                                console.clear();
                                console.log("Legend: x\'  means \"a type derived from x\" (as in calculus).");
                                console.log("      : x\'^ means \"a parent of a type derived from x\" (i.e. x).");
                                console.log();
                                c = fuzztest.generator.VBrowseable.CreateType();
                                console.log("VBrowseable       => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable       => Canonical path:    " + c.GetCanonicalPath());
                                c = fuzztest.generator.rule.VNode.CreateType();
                                console.log("VBrowseable\'      => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable\'      => Canonical path:    " + c.GetCanonicalPath());
                                c = (new TDevCreateObject_02.VDeriv_01()).GetClass();
                                console.log("VBrowseable\'      => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable\'      => Canonical path:    " + c.GetCanonicalPath());
                                c = (new TDevCreateObject_02.VDeriv_02()).GetClass();
                                console.log("VBrowseable\'\'     => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable\'\'     => Canonical path:    " + c.GetCanonicalPath());
                                c = (new TDevCreateObject_02.VDeriv_01()).GetClass().GetParent();
                                console.log("VBrowseable\'^     => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable\'^     => Canonical path:    " + c.GetCanonicalPath());
                                c = (new TDevCreateObject_02.VDeriv_02()).GetClass().GetParent();
                                console.log("VBrowseable\'\'^    => Inheritence chain: " + c.GetInheritPath());
                                console.log("VBrowseable\'\'^    => Canonical path:    " + c.GetCanonicalPath());
                            };
                            return TDevCreateObject_02;
                        }());
                        trial_01.TDevCreateObject_02 = TDevCreateObject_02;
                        TDevCreateObject_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02";
                        var TDevCreateObject_02;
                        (function (TDevCreateObject_02) {
                            var VDeriv_01 = (function (_super) {
                                __extends(VDeriv_01, _super);
                                function VDeriv_01() {
                                    _super.apply(this, arguments);
                                }
                                return VDeriv_01;
                            }(fuzztest.generator.VBrowseable));
                            TDevCreateObject_02.VDeriv_01 = VDeriv_01;
                            VDeriv_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_01";
                            var VDeriv_02 = (function (_super) {
                                __extends(VDeriv_02, _super);
                                function VDeriv_02() {
                                    _super.apply(this, arguments);
                                }
                                return VDeriv_02;
                            }(fuzztest.generator.rule.VNode));
                            TDevCreateObject_02.VDeriv_02 = VDeriv_02;
                            VDeriv_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_02";
                        })(TDevCreateObject_02 = trial_01.TDevCreateObject_02 || (trial_01.TDevCreateObject_02 = {}));
                    })(trial_01 = from_abstract_class.trial_01 || (from_abstract_class.trial_01 = {}));
                })(from_abstract_class = construct.from_abstract_class || (construct.from_abstract_class = {}));
            })(construct = objects.construct || (objects.construct = {}));
        })(objects = _dev_concepts.objects || (_dev_concepts.objects = {}));
    })(_dev_concepts = fuzztest._dev_concepts || (fuzztest._dev_concepts = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var labelled;
            (function (labelled) {
                /**
                 * label: expression
                 *
                 * Corresponding PEGjs rule:
                 * <pre>
                 * LabeledExpression
                 * = label:Identifier __ ":" __ expression:PrefixedExpression
                 * {
                 * return
                 * {
                 * type:               "labeled",
                 * label:              label,
                 * expression:         expression,
                 * location:           location ()
                 * };
                 * }
                 * / PrefixedExpression
                 * </pre>
                 *
                 * @author peter
                 * @see    {@link TText}, {@link TSimpleAnd}, {@link TSimpleNot}
                 */
                var TLabelled = (function (_super) {
                    __extends(TLabelled, _super);
                    function TLabelled() {
                        _super.call(this);
                        this.fLabel = (new fuzztest.generator.primitive.TOnceAssignable());
                    }
                    TLabelled.prototype.GetLabel = function () {
                        var ret;
                        ret = this.fLabel.Get();
                        return ret;
                    };
                    TLabelled.prototype.SetLabel = function (label) {
                        this.fLabel.Set(label);
                    };
                    return TLabelled;
                }(fuzztest.generator.rule.VNode));
                labelled.TLabelled = TLabelled;
                TLabelled["__classname"] = "fuzztest.generator.rule.labelled.TLabelled";
            })(labelled = rule.labelled || (rule.labelled = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var semanticPredicate;
            (function (semanticPredicate) {
                var semantic_not;
                (function (semantic_not) {
                    /**
                     * Semantic NOT.
                     * <code>! { predicate }</code>.
                     *
                     * From the PEGjs documentation:<br/>
                     * <i>The predicate is a piece of JavaScript code that
                     * is executed as if it was inside a function. [...]
                     * It should return some JavaScript value using the
                     * <code>return</code> statement. If the returned value
                     * evaluates to <code>false</code> in boolean context,
                     * just return <code>undefined</code> and do not advance
                     * the parser position; otherwise consider the match failed.</i>
                     *
                     * Corresponding PEGjs rule:
                     * <pre>
                     * SemanticPredicateExpression
                     * = operator:SemanticPredicateOperator __ code:CodeBlock
                     * {
                     * var OPS_TO_SEMANTIC_PREDICATE_TYPES =
                     * {
                     * "&": "semantic_and",
                     * "!": "semantic_not"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
                     * code:               code,
                     * location:           location ()
                     * };
                     * }
                     * </pre>
                     *
                     * @author peter
                     * @see    {@link TSemanticAnd}
                     */
                    var TSemanticNot = (function (_super) {
                        __extends(TSemanticNot, _super);
                        function TSemanticNot() {
                            _super.apply(this, arguments);
                        }
                        return TSemanticNot;
                    }(fuzztest.generator.rule.VNode));
                    semantic_not.TSemanticNot = TSemanticNot;
                    TSemanticNot["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot";
                })(semantic_not = semanticPredicate.semantic_not || (semanticPredicate.semantic_not = {}));
            })(semanticPredicate = rule.semanticPredicate || (rule.semanticPredicate = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var semanticPredicate;
            (function (semanticPredicate) {
                var semantic_and;
                (function (semantic_and) {
                    /**
                     * Semantic AND.
                     * <code>& { predicate }</code>.
                     *
                     * From the PEGjs documentation:<br/>
                     * <i>The predicate is a piece of JavaScript code that
                     * is executed as if it was inside a function. [...]
                     * It should return some JavaScript value using the
                     * <code>return</code> statement. If the returned value
                     * evaluates to <code>true</code> in boolean context,
                     * just return <code>undefined</code> and do not advance
                     * the parser position; otherwise consider the match failed.</i>
                     *
                     * Corresponding PEGjs rule:
                     * <pre>
                     * SemanticPredicateExpression
                     * = operator:SemanticPredicateOperator __ code:CodeBlock
                     * {
                     * var OPS_TO_SEMANTIC_PREDICATE_TYPES =
                     * {
                     * "&": "semantic_and",
                     * "!": "semantic_not"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
                     * code:               code,
                     * location:           location ()
                     * };
                     * }
                     * </pre>
                     *
                     * @author peter
                     * @see    {@link TSemanticNot}
                     */
                    var TSemanticAnd = (function (_super) {
                        __extends(TSemanticAnd, _super);
                        function TSemanticAnd() {
                            _super.apply(this, arguments);
                        }
                        return TSemanticAnd;
                    }(fuzztest.generator.rule.VNode));
                    semantic_and.TSemanticAnd = TSemanticAnd;
                    TSemanticAnd["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd";
                })(semantic_and = semanticPredicate.semantic_and || (semanticPredicate.semantic_and = {}));
            })(semanticPredicate = rule.semanticPredicate || (rule.semanticPredicate = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var rule_ref;
            (function (rule_ref) {
                /**
                 * rule reference.
                 *
                 * Corresponding PEGjs rule:
                 * <pre>
                 * RuleReferenceExpression
                 * = name:IdentifierName !(__ (StringLiteral __)? "=")
                 * {
                 * return
                 * {
                 * type:               "rule_ref",
                 * name:               name,
                 * location:           location ()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TReference = (function (_super) {
                    __extends(TReference, _super);
                    function TReference() {
                        _super.apply(this, arguments);
                    }
                    return TReference;
                }(fuzztest.generator.rule.VNode));
                rule_ref.TReference = TReference;
                TReference["__classname"] = "fuzztest.generator.rule.rule_ref.TReference";
            })(rule_ref = rule.rule_ref || (rule.rule_ref = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var cClass;
            (function (cClass) {
                /**
                 * A single character generator. Creates characters that (don't) match a given character class.
                 * The character class can have multiple character ranges or character points, such as
                 * <code>[0-9]</code> or <code>[a-z][0-9]_</code>.
                 *
                 * Corresponding PEGjs rules:
                 *
                 * <pre>
                 * CharacterClassMatcher "character class"
                 * = "[" inverted:"^"? parts:(ClassCharacterRange / ClassCharacter)* "]" ignoreCase:"i"?
                 * {
                 * var _i;
                 * var _parts;
                 * var _filteredEmptyStrings;
                 *
                 * _parts = [];
                 * if (parts.length >= 1)
                 * {
                 * for (i = 0; i < parts.length; i++)
                 * {
                 * if (parts [i] !== "")
                 * {
                 * _parts.push (parts[i]);
                 * }
                 * }
                 * }
                 *
                 * return
                 * {
                 * type:               "class",
                 * parts:              _parts,
                 * inverted:           inverted !== null,
                 * ignoreCase:         ignoreCase !== null,
                 * location:           location()
                 * };
                 * }
                 *
                 * ClassCharacterRange
                 * = begin:ClassCharacter "-" end:ClassCharacter
                 * {
                 * if (begin.charCodeAt(0) > end.charCodeAt(0))
                 * {
                 * error ("Invalid character range: " + text() + ".");
                 * }
                 *
                 * return [begin, end];
                 * }
                 *
                 * ClassCharacter
                 * = !("]" / "\\" / LineTerminator) SourceCharacter
                 * {
                 * return text ();
                 * }
                 * / "\\" sequence:EscapeSequence
                 * {
                 * return sequence;
                 * }
                 * / LineContinuation
                 * </pre>
                 *
                 * @author peter
                 */
                var TCharacterClass = (function (_super) {
                    __extends(TCharacterClass, _super);
                    /**
                     * cTor.
                     */
                    function TCharacterClass() {
                        _super.call(this);
                        this.fSets = (new java.util.ArrayList());
                    }
                    TCharacterClass.prototype.AddPoint = function (ch) {
                        var set;
                        set = new fuzztest.generator.rule.cClass.TCharacterPoint(ch);
                        this.fSets.add(set);
                    };
                    /**
                     * @param string
                     * @param string2
                     */
                    TCharacterClass.prototype.AddRange = function (loChar, hiChar) {
                        var set;
                        set = new fuzztest.generator.rule.cClass.TCharacterRange(loChar, hiChar);
                        this.fSets.add(set);
                    };
                    TCharacterClass.prototype._CreateData = function (s, head) {
                        var n;
                        var cs;
                        var x;
                        var ret;
                        n = this.fSets.size();
                        if (n >= 1) {
                            x = fuzztest.utils.gen.TGenData.GetInt(n);
                            cs = this.fSets.get(x);
                            ret = head + cs.GetChar(s);
                        }
                        else {
                            ret = head;
                        }
                        return ret;
                    };
                    return TCharacterClass;
                }(fuzztest.generator.rule.VNode));
                cClass.TCharacterClass = TCharacterClass;
                TCharacterClass["__classname"] = "fuzztest.generator.rule.cClass.TCharacterClass";
            })(cClass = rule.cClass || (rule.cClass = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var prefixed;
            (function (prefixed) {
                var simple_not;
                (function (simple_not) {
                    /**
                     *
                     *
                     * Corresponding PEGjs rule:
                     *
                     * <pre>
                     * PrefixedExpression
                     * = operator:PrefixedOperator __ expression:SuffixedExpression
                     * {
                     * var OPS_TO_PREFIXED_TYPES =
                     * {
                     * "$": "text",
                     * "&": "simple_and",
                     * "!": "simple_not"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_PREFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / SuffixedExpression
                     * </pre>
                     *
                     * @author peter
                     * @see    {@link TSemanticAnd}, {@link TText}
                     */
                    var TSimpleNot = (function (_super) {
                        __extends(TSimpleNot, _super);
                        function TSimpleNot() {
                            _super.apply(this, arguments);
                        }
                        return TSimpleNot;
                    }(fuzztest.generator.rule.VNode));
                    simple_not.TSimpleNot = TSimpleNot;
                    TSimpleNot["__classname"] = "fuzztest.generator.rule.prefixed.simple_not.TSimpleNot";
                })(simple_not = prefixed.simple_not || (prefixed.simple_not = {}));
            })(prefixed = rule.prefixed || (rule.prefixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var prefixed;
            (function (prefixed) {
                var text;
                (function (text) {
                    /**
                     *
                     *
                     * Corresponding PEGjs rule:
                     *
                     * <pre>
                     * PrefixedExpression
                     * = operator:PrefixedOperator __ expression:SuffixedExpression
                     * {
                     * var OPS_TO_PREFIXED_TYPES =
                     * {
                     * "$": "text",
                     * "&": "simple_and",
                     * "!": "simple_not"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_PREFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / SuffixedExpression
                     * </pre>
                     *
                     * $expression
                     *
                     * @author peter
                     * @see    {@link TSemanticAnd}, {@link TSimpleNot}
                     */
                    var TText = (function (_super) {
                        __extends(TText, _super);
                        function TText() {
                            _super.apply(this, arguments);
                        }
                        return TText;
                    }(fuzztest.generator.rule.VNode));
                    text.TText = TText;
                    TText["__classname"] = "fuzztest.generator.rule.prefixed.text.TText";
                })(text = prefixed.text || (prefixed.text = {}));
            })(prefixed = rule.prefixed || (rule.prefixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var prefixed;
            (function (prefixed) {
                var simple_and;
                (function (simple_and) {
                    /**
                     *
                     *
                     * Corresponding PEGjs rule:
                     *
                     * <pre>
                     * PrefixedExpression
                     * = operator:PrefixedOperator __ expression:SuffixedExpression
                     * {
                     * var OPS_TO_PREFIXED_TYPES =
                     * {
                     * "$": "text",
                     * "&": "simple_and",
                     * "!": "simple_not"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_PREFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / SuffixedExpression
                     * </pre>
                     *
                     * @author peter
                     */
                    var TSimpleAnd = (function (_super) {
                        __extends(TSimpleAnd, _super);
                        function TSimpleAnd() {
                            _super.apply(this, arguments);
                        }
                        return TSimpleAnd;
                    }(fuzztest.generator.rule.VNode));
                    simple_and.TSimpleAnd = TSimpleAnd;
                    TSimpleAnd["__classname"] = "fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd";
                })(simple_and = prefixed.simple_and || (prefixed.simple_and = {}));
            })(prefixed = rule.prefixed || (rule.prefixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var sequence;
            (function (sequence) {
                /**
                 * expression1 expression2 ...
                 *
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * SequenceExpression
                 * = head:LabeledExpression tail:(__ LabeledExpression)*
                 * {
                 * var _i;
                 * var _elements;
                 * var ret;
                 *
                 * if (tail.length > 0)
                 * {
                 * _elements      = [];
                 * _elements [0]   = head;
                 * for (i = 0; i < tail.length; i++)
                 * {
                 * _elements [i+1] = tail [i][1];
                 * }
                 *
                 * ret =
                 * {
                 * type:           "sequence",
                 * elements:       _elements,
                 * location:       location ()
                 * };
                 * }
                 * else
                 * {
                 * ret = head;
                 * }
                 *
                 * return ret;
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TSequence = (function (_super) {
                    __extends(TSequence, _super);
                    function TSequence() {
                        _super.call(this);
                        this.fElements = (new java.util.ArrayList());
                    }
                    TSequence.prototype.Add = function (element) {
                        this.fElements.add(element);
                    };
                    TSequence.prototype._CreateData = function (s, head) {
                        var i;
                        var n;
                        var e;
                        var ret;
                        ret = head;
                        n = this.fElements.size();
                        if (n >= 1) {
                            for (i = 0; i < n; i++) {
                                e = this.fElements.get(i);
                                ret = ret + e.CreateData(s, "");
                            }
                        }
                        return ret;
                    };
                    return TSequence;
                }(fuzztest.generator.rule.VNode));
                sequence.TSequence = TSequence;
                TSequence["__classname"] = "fuzztest.generator.rule.sequence.TSequence";
            })(sequence = rule.sequence || (rule.sequence = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var expression;
            (function (expression) {
                /**
                 * Corresponding PEGjs rule:
                 * <pre>
                 * Expression
                 * = ChoiceExpression
                 * </pre>
                 * @author peter
                 */
                var TExpression = (function (_super) {
                    __extends(TExpression, _super);
                    function TExpression() {
                        _super.apply(this, arguments);
                    }
                    return TExpression;
                }(fuzztest.generator.rule.VNode));
                expression.TExpression = TExpression;
                TExpression["__classname"] = "fuzztest.generator.rule.expression.TExpression";
            })(expression = rule.expression || (rule.expression = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var grammar;
            (function (grammar) {
                /**
                 * Generator rule for: Whole grammar.
                 *
                 * Corresponding PEGjs rule:
                 * <pre>
                 * Grammar
                 * = __ initializer:(Initializer __)? rules:(Rule __)+
                 * {
                 * var _init;
                 * var _i;
                 * var _extractedRules;
                 *
                 * if (initializer)
                 * {
                 * _init = initializer [0];
                 * }
                 * else
                 * {
                 * _init = null;
                 * }
                 *
                 * _extractedRules = new Array (rules.length);
                 * for (_i = 0; _i < rules.length; _i++)
                 * {
                 * _extractedRules[_i] = rules[_i][0];
                 * }
                 *
                 * return
                 * {
                 * type:               "grammar",
                 * initializer:        _init,
                 * rules:              _extractedRules,
                 * location:           location ()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TGrammar = (function (_super) {
                    __extends(TGrammar, _super);
                    function TGrammar() {
                        _super.apply(this, arguments);
                    }
                    TGrammar.prototype._CreateData = function (s, head) {
                        var rStart;
                        var ret;
                        rStart = fuzztest.generator.TRepository.Get(TGrammar.kKeyStart);
                        ret = rStart.CreateData(s, head);
                        return ret;
                    };
                    TGrammar.kKeyStart = "start";
                    return TGrammar;
                }(fuzztest.generator.rule.VNode));
                grammar.TGrammar = TGrammar;
                TGrammar["__classname"] = "fuzztest.generator.rule.grammar.TGrammar";
            })(grammar = rule.grammar || (rule.grammar = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var initializer;
            (function (initializer) {
                /**
                 * Corresponding PEGjs rule:
                 * <pre>
                 * Initializer
                 * = code:CodeBlock EOS
                 * {
                 * return
                 * {
                 * type:               "initializer",
                 * code:               code,
                 * location:           location ()
                 * };
                 * }
                 * </pre>
                 * @author peter
                 */
                var TInitializer = (function (_super) {
                    __extends(TInitializer, _super);
                    function TInitializer() {
                        _super.apply(this, arguments);
                    }
                    return TInitializer;
                }(fuzztest.generator.rule.VNode));
                initializer.TInitializer = TInitializer;
                TInitializer["__classname"] = "fuzztest.generator.rule.initializer.TInitializer";
            })(initializer = rule.initializer || (rule.initializer = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var literal;
            (function (literal_1) {
                /**
                 *
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * LiteralMatcher "literal"
                 * = value:StringLiteral ignoreCase:"i"?
                 * {
                 * return
                 * {
                 * type:               "literal",
                 * value:              value,
                 * ignoreCase:         ignoreCase !== null,
                 * location:           location()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TLiteral = (function (_super) {
                    __extends(TLiteral, _super);
                    /**
                     *
                     */
                    function TLiteral(literal) {
                        _super.call(this);
                        this.fLiteral = literal;
                    }
                    TLiteral.prototype._CreateData = function (s, head) {
                        var doFollow;
                        var lit;
                        var ret;
                        doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
                        if (doFollow) {
                            lit = this;
                        }
                        else {
                            lit = this._GetFromOppositeSet();
                        }
                        ret = head + lit.fLiteral;
                        return ret;
                    };
                    return TLiteral;
                }(fuzztest.generator.rule.VNode));
                literal_1.TLiteral = TLiteral;
                TLiteral["__classname"] = "fuzztest.generator.rule.literal.TLiteral";
            })(literal = rule.literal || (rule.literal = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var action;
            (function (action) {
                /**
                 * <pre>
                 * ActionExpression
                 * = expression:SequenceExpression code:(__ CodeBlock)?
                 * {
                 * var ret;
                 *
                 * if (code !== null)
                 * {
                 * ret =
                 * {
                 * type:           "action",
                 * expression:     expression,
                 * code:           code[1],
                 * location:       location ()
                 * };
                 * }
                 * else
                 * {
                 * ret = expression;
                 * }
                 *
                 * return ret;
                 * }
                 * </pre>
                 * @author peter
                 */
                var TAction = (function (_super) {
                    __extends(TAction, _super);
                    function TAction() {
                        _super.apply(this, arguments);
                    }
                    return TAction;
                }(fuzztest.generator.rule.VNode));
                action.TAction = TAction;
                TAction["__classname"] = "fuzztest.generator.rule.action.TAction";
            })(action = rule.action || (rule.action = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var named;
            (function (named) {
                /**
                 *
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * Rule
                 * = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
                 * {
                 * var _ex;
                 *
                 * if (displayName !== null)
                 * {
                 * _ex =
                 * {
                 * type:           "named",
                 * name:           displayName[0],
                 * expression:     expression,
                 * location:       location ()
                 * };
                 * }
                 * else
                 * {
                 * _ex = expression;
                 * }
                 *
                 * return
                 * {
                 * type:               "rule",
                 * name:               name,
                 * expression:         _ex,
                 * location:           location ()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 * @see    {@link TRule}
                 */
                var TNamed = (function (_super) {
                    __extends(TNamed, _super);
                    function TNamed() {
                        _super.call(this);
                        this.fName = (new fuzztest.generator.primitive.TOnceAssignable());
                    }
                    TNamed.prototype.GetName = function () {
                        var ret;
                        ret = this.fName.Get();
                        return ret;
                    };
                    TNamed.prototype.SetName = function (name) {
                        this.fName.Set(name);
                    };
                    return TNamed;
                }(fuzztest.generator.rule.VNode));
                named.TNamed = TNamed;
                TNamed["__classname"] = "fuzztest.generator.rule.named.TNamed";
            })(named = rule.named || (rule.named = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var choice;
            (function (choice) {
                /**
                 *
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * ChoiceExpression
                 * = head:ActionExpression tail:(__ "/" __ ActionExpression)*
                 * {
                 * var _alternatives;
                 * var _i;
                 * var ret;
                 *
                 * if (tail.length > 0)
                 * {
                 * _alternatives      = [];
                 * _alternatives [0]  = head;
                 * for (i = 0; i < tail.length; i++)
                 * {
                 * _alternatives [i+1] = tail [i][3];
                 * }
                 *
                 * ret =
                 * {
                 * type:           "choice",
                 * alternatives:   _alternatives,
                 * location:       location ()
                 * };
                 * }
                 * else
                 * {
                 * ret = head;
                 * }
                 *
                 * return ret;
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TChoice = (function (_super) {
                    __extends(TChoice, _super);
                    /**
                     *
                     */
                    function TChoice() {
                        _super.call(this);
                        this.fBranches = (new java.util.ArrayList());
                    }
                    TChoice.prototype.AddExpression = function (node) {
                        this.fBranches.add(node);
                    };
                    TChoice.prototype._CreateData = function (s, head) {
                        var i;
                        var n;
                        var node;
                        var ret;
                        n = this.fBranches.size();
                        if (n >= 1) {
                            i = fuzztest.utils.gen.TGenData.GetInt(n);
                            node = this.fBranches.get(i);
                            ret = node.CreateData(s, head);
                        }
                        else {
                            ret = head;
                        }
                        return ret;
                    };
                    return TChoice;
                }(fuzztest.generator.rule.VNode));
                choice.TChoice = TChoice;
                TChoice["__classname"] = "fuzztest.generator.rule.choice.TChoice";
            })(choice = rule.choice || (rule.choice = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var group;
            (function (group) {
                /**
                 * Corresponding PEGjs rule:
                 * <pre>
                 * PrimaryExpression
                 * = LiteralMatcher
                 * / CharacterClassMatcher
                 * / AnyMatcher
                 * / RuleReferenceExpression
                 * / SemanticPredicateExpression
                 * / "(" __ expression:Expression __ ")"
                 * {
                 * var ret;
                 *
                 * /
                 * * The purpose of the "group" AST node is just to isolate label scope. We
                 * * don't need to put it around nodes that can't contain any labels or
                 * * nodes that already isolate label scope themselves. This leaves us with
                 * * "labeled" and "sequence".
                 * /
                 * if (expression.type === 'labeled' || expression.type === 'sequence')
                 * {
                 * ret =
                 * {
                 * type:           "group",
                 * expression:     expression
                 * };
                 * }
                 * else
                 * {
                 * ret = expression;
                 * }
                 *
                 * return ret;
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TGroup = (function (_super) {
                    __extends(TGroup, _super);
                    function TGroup() {
                        _super.apply(this, arguments);
                    }
                    return TGroup;
                }(fuzztest.generator.rule.VNode));
                group.TGroup = TGroup;
                TGroup["__classname"] = "fuzztest.generator.rule.group.TGroup";
            })(group = rule.group || (rule.group = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule_1) {
            var rule;
            (function (rule) {
                /**
                 * rules = expression
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * Rule
                 * = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
                 * {
                 * var _ex;
                 *
                 * if (displayName !== null)
                 * {
                 * _ex =
                 * {
                 * type:           "named",
                 * name:           displayName[0],
                 * expression:     expression,
                 * location:       location ()
                 * };
                 * }
                 * else
                 * {
                 * _ex = expression;
                 * }
                 *
                 * return
                 * {
                 * type:               "rule",
                 * name:               name,
                 * expression:         _ex,
                 * location:           location ()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 * @see    {@link TNamed}
                 */
                var TRule = (function (_super) {
                    __extends(TRule, _super);
                    function TRule(key) {
                        _super.call(this, key);
                    }
                    TRule.prototype._CreateData = function (s, head) {
                        var doFollow;
                        var ref;
                        var expr;
                        var ret;
                        doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
                        if (doFollow) {
                            ref = this;
                        }
                        else {
                            ref = this._GetFromOppositeSet();
                        }
                        expr = ref._GetExpression();
                        ret = expr.CreateData(s, head);
                        return ret;
                    };
                    return TRule;
                }(fuzztest.generator.rule.VNode));
                rule.TRule = TRule;
                TRule["__classname"] = "fuzztest.generator.rule.rule.TRule";
            })(rule = rule_1.rule || (rule_1.rule = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var any;
            (function (any) {
                /**
                 * Generator rule for: Any character.
                 *
                 * Corresponding PEGjs rule:
                 *
                 * <pre>
                 * AnyMatcher
                 * = "."
                 * {
                 * return
                 * {
                 * type:               "any",
                 * location:           location()
                 * };
                 * }
                 * </pre>
                 *
                 * @author peter
                 */
                var TAny = (function (_super) {
                    __extends(TAny, _super);
                    function TAny() {
                        _super.apply(this, arguments);
                    }
                    TAny.prototype._CreateData = function (s, head) {
                        var ret;
                        ret = head + fuzztest.utils.gen.TGenData.GetChar();
                        return ret;
                    };
                    return TAny;
                }(fuzztest.generator.rule.VNode));
                any.TAny = TAny;
                TAny["__classname"] = "fuzztest.generator.rule.any.TAny";
            })(any = rule.any || (rule.any = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var suffixed;
            (function (suffixed) {
                /**
                 * @author peter
                 */
                var VSuffixed = (function (_super) {
                    __extends(VSuffixed, _super);
                    function VSuffixed(isNMinZero, isNMaxInfinite) {
                        _super.call(this);
                        this.fIsNMinZero = false;
                        this.fIsNMaxInfinite = false;
                        this.fIsNMinZero = isNMinZero;
                        this.fIsNMaxInfinite = isNMaxInfinite;
                    }
                    /**
                     * @see         VBrowseable#CreateType()
                     */
                    VSuffixed.CreateType = function () {
                        var ret;
                        ret = (new VSuffixed.VSuffixedType()).GetClass().GetParent();
                        return ret;
                    };
                    VSuffixed.prototype._CreateData = function (s, head) {
                        var r;
                        var ex;
                        var doBreakRule;
                        var nMin;
                        var nMax;
                        var n;
                        var i;
                        var ret;
                        doBreakRule = true;
                        r = s.GetRuleAdhesion();
                        if (r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) {
                            doBreakRule = false;
                        }
                        else {
                            doBreakRule = fuzztest.utils.gen.TGenData.GetBoolean();
                        }
                        n = 0;
                        if (doBreakRule) {
                            nMin = 0;
                            nMax = 0;
                            if (this.fIsNMinZero && !this.fIsNMaxInfinite) {
                                nMax = 1;
                            }
                            else if (!this.fIsNMinZero && this.fIsNMaxInfinite) {
                                nMax = 0;
                            }
                            else if (this.fIsNMinZero && this.fIsNMaxInfinite) {
                                nMax = s.GetNumRepeatsMax();
                            }
                            if (nMax >= 1) {
                                n = fuzztest.utils.gen.TGenData.GetInt(nMin, nMax);
                            }
                        }
                        else {
                            nMin = this.fIsNMinZero ? 0 : 1;
                            nMax = this.fIsNMaxInfinite ? s.GetNumRepeatsMax() : 1;
                            n = fuzztest.utils.gen.TGenData.GetInt(nMin, nMax);
                        }
                        ret = head;
                        if (n >= 1) {
                            ex = this._GetExpression();
                            for (i = 1; i <= n; i++) {
                                ret = ret + ex.CreateData(s, "");
                            }
                        }
                        return ret;
                    };
                    return VSuffixed;
                }(fuzztest.generator.rule.VNode));
                suffixed.VSuffixed = VSuffixed;
                VSuffixed["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed";
                var VSuffixed;
                (function (VSuffixed) {
                    var VSuffixedType = (function (_super) {
                        __extends(VSuffixedType, _super);
                        function VSuffixedType() {
                            _super.call(this, false, false);
                        }
                        return VSuffixedType;
                    }(fuzztest.generator.rule.suffixed.VSuffixed));
                    VSuffixed.VSuffixedType = VSuffixedType;
                    VSuffixedType["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed.VSuffixedType";
                })(VSuffixed = suffixed.VSuffixed || (suffixed.VSuffixed = {}));
            })(suffixed = rule.suffixed || (rule.suffixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     *
                     * <TT>RANMAR</TT> is a lagged Fibonacci generator proposed by Marsaglia and
                     * Zaman and is a good research grade generator. This version of <TT>RANMAR</TT>
                     * is based on the paper by James, which is a good reference for the properties
                     * of <TT>RANMAR</TT> and several other generators.
                     *
                     * <BR>
                     * <B>REFERENCES:</B> <BR>
                     * F. James, <CITE>Comp. Phys. Comm.</CITE> <STRONG>60</STRONG> (1990) p 329-344
                     * <BR>
                     * and was originally described in <BR>
                     * G. Marsaglia, A. Zaman and W.-W Tsang, <CITE>Stat. Prob. Lett</CITE>
                     * <STRONG>9</STRONG> (1990) p 35.
                     *
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/Ranmar.java"> Source
                     * code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     */
                    var Ranmar = (function (_super) {
                        __extends(Ranmar, _super);
                        /**
                         *
                         * Seed <TT>RANMAR</TT> from the clock.
                         *
                         * <PRE>
                         * RandomElement e = new Ranmar (new Date ());
                         * </PRE>
                         *
                         * @param d
                         * a Date object to seed Ranmar with, typically
                         * <CODE>new Date()</CODE>
                         */
                        function Ranmar(d) {
                            var _this = this;
                            if (((d != null && d instanceof java.util.Date) || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.c = 0;
                                this.cd = 0;
                                this.cm = 0;
                                this.i97 = 0;
                                this.j97 = 0;
                                (function () {
                                    _this.ranmarin((RngPack.RandomSeedable.ClockSeed(d) | 0) % Ranmar.BIG_PRIME);
                                })();
                            }
                            else if (((typeof d === 'number') || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ijkl_1 = __args[0];
                                _super.call(this);
                                this.c = 0;
                                this.cd = 0;
                                this.cm = 0;
                                this.i97 = 0;
                                this.j97 = 0;
                                (function () {
                                    _this.ranmarin(Math.abs(ijkl_1 % Ranmar.BIG_PRIME));
                                })();
                            }
                            else if (((typeof d === 'number') || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ijkl_2 = __args[0];
                                _super.call(this);
                                this.c = 0;
                                this.cd = 0;
                                this.cm = 0;
                                this.i97 = 0;
                                this.j97 = 0;
                                (function () {
                                    _this.ranmarin((Math.abs(ijkl_2 % Ranmar.BIG_PRIME) | 0));
                                })();
                            }
                            else if (d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.c = 0;
                                this.cd = 0;
                                this.cm = 0;
                                this.i97 = 0;
                                this.j97 = 0;
                                (function () {
                                    _this.ranmarin(Ranmar.DEFSEED);
                                })();
                            }
                            else
                                throw new Error('invalid overload');
                        }
                        /**
                         *
                         * Internal methods: ranmarin is the initialization code for the generator.
                         */
                        Ranmar.prototype.ranmarin = function (ijkl) {
                            var ij;
                            var kl;
                            var i;
                            var ii;
                            var j;
                            var jj;
                            var k;
                            var l;
                            var m;
                            var s;
                            var t;
                            this.u = new Array(97);
                            this.uvec = new Array(97);
                            ij = (ijkl / 30082 | 0);
                            kl = ijkl - 30082 * ij;
                            i = (((ij / 177 | 0)) % 177) + 2;
                            j = (ij % 177) + 2;
                            k = (((kl / 169 | 0)) % 178) + 1;
                            l = kl % 169;
                            for (ii = 0; ii < 97; ii++) {
                                s = 0.0;
                                t = 0.5;
                                for (jj = 0; jj < 24; jj++) {
                                    m = (((i * j) % 179) * k) % 179;
                                    i = j;
                                    j = k;
                                    k = m;
                                    l = (53 * l + 1) % 169;
                                    if (((l * m) % 64) >= 32)
                                        s += t;
                                    t *= 0.5;
                                }
                                this.u[ii] = s;
                            }
                            this.c = 362436.0 / 1.6777216E7;
                            this.cd = 7654321.0 / 1.6777216E7;
                            this.cm = 1.6777213E7 / 1.6777216E7;
                            this.i97 = 96;
                            this.j97 = 32;
                        };
                        /**
                         * The generator
                         *
                         * @return a pseudo random number
                         */
                        Ranmar.prototype.raw$ = function () {
                            var uni;
                            uni = this.u[this.i97] - this.u[this.j97];
                            if (uni < 0.0)
                                uni += 1.0;
                            this.u[this.i97] = uni;
                            if (--this.i97 < 0)
                                this.i97 = 96;
                            if (--this.j97 < 0)
                                this.j97 = 96;
                            this.c -= this.cd;
                            if (this.c < 0.0)
                                this.c += this.cm;
                            uni -= this.c;
                            if (uni < 0.0)
                                uni += 1.0;
                            return (uni);
                        };
                        /**
                         *
                         * A version of the generator for filling arrays, inlined for speed
                         *
                         * @param d
                         * an array of doubles to be filled
                         * @param n
                         * size of the array
                         */
                        Ranmar.prototype.raw = function (d, n) {
                            var _this = this;
                            if (((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    var uni;
                                    for (var i = 0; i < n; i++) {
                                        uni = _this.u[_this.i97] - _this.u[_this.j97];
                                        if (uni < 0.0)
                                            uni += 1.0;
                                        _this.u[_this.i97] = uni;
                                        if (--_this.i97 < 0)
                                            _this.i97 = 96;
                                        if (--_this.j97 < 0)
                                            _this.j97 = 96;
                                        _this.c -= _this.cd;
                                        if (_this.c < 0.0)
                                            _this.c += _this.cm;
                                        uni -= _this.c;
                                        if (uni < 0.0)
                                            uni += 1.0;
                                        d[i] = uni;
                                    }
                                })();
                            }
                            else if (((d != null && d instanceof Array) || d === null) && n === undefined) {
                                return this.raw$double_A(d);
                            }
                            else if (d === undefined && n === undefined) {
                                return this.raw$();
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         * Default seed. <CODE>DEFSEED=54217137</CODE>
                         */
                        Ranmar.DEFSEED = 54217137;
                        /**
                         * The 46,009,220nd prime number, he largest prime less than 9*10
                         * <SUP>8</SUP>. Used as a modulus because this version of <TT>RANMAR</TT>
                         * needs a seed between 0 and 9*10<SUP>8</SUP> and <CODE>BIG_PRIME</CODE>
                         * isn't commensurate with any regular period.
                         * <CODE>BIG_PRIME= 899999963</CODE>
                         */
                        Ranmar.BIG_PRIME = 899999963;
                        return Ranmar;
                    }(edu.cornell.lassp.houle.RngPack.RandomSeedable));
                    RngPack.Ranmar = Ranmar;
                    Ranmar["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranmar";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     *
                     * <TT>RANLUX</TT> is an advanced pseudo-random number generator based on the
                     * <TT>RCARRY</TT> algorithm proposed in 1991 by Marsaglia and Zaman.
                     * <TT>RCARRY</TT> used a subtract-and-borrow algorithm with a period on the
                     * order of 10<SUP>171</SUP> but still had detectable correlations between
                     * numbers. Martin Luescher proposed the <TT>RANLUX</TT> algorithm in 1993;
                     * <TT>RANLUX</TT> generates pseudo-random numbers using <TT>RCARRY</TT> but
                     * throws away numbers to destroy correlations. Thus RANLUX trades execution
                     * speed for quality; by choosing a larger luxury setting one gets better random
                     * numbers slower. By the tests availible at the time it was proposed,
                     * <TT>RANLUX</TT> at the default luxury setting appears to be a significant
                     * advance quality over previous generators.
                     *
                     * <BR>
                     * <BR>
                     * <CENTER> <TABLE BORDER WIDTH=80%>
                     * <TR>
                     * <TD ALIGN=center COLSPAN=3><A NAME="luxury"><FONT SIZE=+2>LUXURY
                     * LEVELS</FONT></A></TD>
                     * </TR>
                     * <TR>
                     * <TD>level</TD>
                     * <TD ALIGN=center>p</TD>
                     * <TD><BR>
                     * </TD>
                     * </TR>
                     * <TR>
                     * <TD ALIGN=center>0</TD>
                     * <TD ALIGN="center">24</TD>
                     * <TD>equivalent to the original <TT>RCARRY</TT> of Marsaglia and Zaman, very
                     * long period, but fails many tests.</TD>
                     * </TR>
                     * <TR>
                     * <TD ALIGN=center>1</TD>
                     * <TD ALIGN=center>48</TD>
                     * <TD>considerable improvement in quality over level 0, now passes the gap
                     * test, but still fails spectral test.</TD>
                     * </TR>
                     * <TR>
                     * <TD ALIGN=center>2</TD>
                     * <TD ALIGN=center>97</TD>
                     * <TD>passes all known tests, but theoretically still defective.</TD>
                     * </TR>
                     * <TR BGCOLOR="#FFA0A0">
                     * <TD ALIGN=center BGCOLOR="#FFA0A0">3</TD>
                     * <TD ALIGN=center>223</TD>
                     * <TD>DEFAULT VALUE. Any theoretically possible correlations have very small
                     * chance of being observed.</TD>
                     * </TR>
                     * <TR>
                     * <TD ALIGN=center>4
                     * <TD ALIGN=center>389</TD>
                     * <TD>highest possible luxury, all 24 bits chaotic.</TD>
                     * </TR>
                     *
                     * </TABLE>
                     * </CENTER> <BR>
                     * <CENTER><FONT SIZE=+1> <B>VALIDATION</B></FONT> </CENTER>
                     *
                     * The Java version of <TT>RANLUX</TT> has been verified against published
                     * values of numbers 1-5 and 101-105 produced by the reference implementation of
                     * <TT>RANLUX</TT> for the following initial conditions:
                     *
                     * <UL>
                     * <LI>Default initialization: <CODE>Ranlux()</CODE>
                     * <LI>Initialization with: <CODE>Ranlux(0,0)</CODE>
                     * <LI>Initialization with: <CODE>Ranlux(389,1)</CODE>
                     * <LI>Initialization with: <CODE>Ranlux(75,0)</CODE>
                     * </UL>
                     * References:
                     * <UL>
                     * <LI>M. Luscher, <CITE> Computer Physics Communications</CITE> <B>79</B>
                     * (1994) 100
                     * <LI>F. James, <CITE>Computer Physics Communications</CITE> <B>79</B> (1994)
                     * 111
                     * <LI><A HREF=
                     * "http://www.mpa-garching.mpg.de/~tomek/htmls/refs/ranlux.about.html">About
                     * <TT>RANLUX</TT> random number generator: Excerpts from discussion in the
                     * Usenet news groups</A>
                     * <LI><A HREF=
                     * "http://www.mpa-garching.mpg.de/~tomek/htmls/refs/ranlux.f90_2.html">Miller's
                     * FORTRAN 90 implementation of <TT>RANLUX</TT> with test code</A>
                     *
                     * </UL>
                     *
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/Ranlux.java"> Source
                     * code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     */
                    var Ranlux = (function (_super) {
                        __extends(Ranlux, _super);
                        /**
                         *
                         * Initialize <TT>RANLUX</TT> with specified <A HREF="#luxury">luxury
                         * level</A> and a Date object. Can be used to conveniently initialize
                         * <TT>RANLUX</TT> from the clock,
                         *
                         * <PRE>
                         * RandomElement e = Ranlux (4, new Date ());
                         * </PRE>
                         *
                         * @param lux
                         * <A HREF="#luxury">luxury</A> level from 0-4.
                         * @param d
                         * date used to generate seed
                         *
                         */
                        function Ranlux(lux, d) {
                            var _this = this;
                            if (((typeof lux === 'number') || lux === null) && ((d != null && d instanceof java.util.Date) || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(lux, ((RngPack.RandomSeedable.ClockSeed(d) % javaemul.internal.IntegerHelper.MAX_VALUE) | 0));
                                })();
                            }
                            else if (((typeof lux === 'number') || lux === null) && ((typeof d === 'number') || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ins_1 = __args[1];
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(lux, Math.abs(ins_1));
                                })();
                            }
                            else if (((typeof lux === 'number') || lux === null) && ((typeof d === 'number') || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ins_2 = __args[1];
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(lux, Math.abs(((ins_2 % javaemul.internal.IntegerHelper.MAX_VALUE) | 0)));
                                })();
                            }
                            else if (((lux != null && lux instanceof java.util.Date) || lux === null) && d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                var d_1 = __args[0];
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(Ranlux.lxdflt, ((RngPack.RandomSeedable.ClockSeed(d_1) % javaemul.internal.IntegerHelper.MAX_VALUE) | 0));
                                })();
                            }
                            else if (((typeof lux === 'number') || lux === null) && d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ins_3 = __args[0];
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(Ranlux.lxdflt, Math.abs(ins_3));
                                })();
                            }
                            else if (((typeof lux === 'number') || lux === null) && d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                var ins_4 = __args[0];
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxgo(Ranlux.lxdflt, Math.abs(((ins_4 % javaemul.internal.IntegerHelper.MAX_VALUE) | 0)));
                                })();
                            }
                            else if (lux === undefined && d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.luxlev = Ranlux.lxdflt;
                                this.in24 = 0;
                                this.kount = 0;
                                this.mkount = 0;
                                this.i24 = 24;
                                this.j24 = 10;
                                this.carry = 0.0;
                                this.diagOn = false;
                                this.nskip = 0;
                                this.inseed = 0;
                                this.jseed = 0;
                                this.twom24 = 0;
                                this.twom12 = 0;
                                (function () {
                                    _this.init_arrays();
                                    _this.rluxdef();
                                })();
                            }
                            else
                                throw new Error('invalid overload');
                        }
                        Ranlux.itwo24_$LI$ = function () { if (Ranlux.itwo24 == null)
                            Ranlux.itwo24 = 1 << 24; return Ranlux.itwo24; };
                        ;
                        Ranlux.ndskip_$LI$ = function () { if (Ranlux.ndskip == null)
                            Ranlux.ndskip = [0, 24, 73, 199, 365]; return Ranlux.ndskip; };
                        ;
                        /**
                         * Turns diagnostic messages on and off. If <TT>setDiag(true)</TT> is
                         * called, <TT>RANLUX</TT> will print diagnostic information to
                         * <TT>System.err</TT>
                         *
                         * @param b
                         * diagnostic message status
                         */
                        Ranlux.prototype.setDiag = function (b) {
                            this.diagOn = b;
                        };
                        /**
                         *
                         * The random number generator.
                         *
                         * @returns a pseudo-random double in the range (0,1)
                         */
                        Ranlux.prototype.raw$ = function () {
                            var i;
                            var k;
                            var lp;
                            var uni;
                            var out;
                            uni = this.seeds[this.j24] - this.seeds[this.i24] - this.carry;
                            if (uni < 0.0) {
                                uni = uni + 1.0;
                                this.carry = this.twom24;
                            }
                            else
                                this.carry = 0.0;
                            this.seeds[this.i24] = uni;
                            this.i24 = this.next[this.i24];
                            this.j24 = this.next[this.j24];
                            out = uni;
                            if (uni < this.twom12)
                                out += this.twom24 * this.seeds[this.j24];
                            if (out === 0.0)
                                out = this.twom24 * this.twom24;
                            this.in24++;
                            if (this.in24 === 24) {
                                this.in24 = 0;
                                this.kount += this.nskip;
                                for (i = 1; i <= this.nskip; i++) {
                                    uni = this.seeds[this.j24] - this.seeds[this.i24] - this.carry;
                                    if (uni < 0.0) {
                                        uni = uni + 1.0;
                                        this.carry = this.twom24;
                                    }
                                    else
                                        this.carry = 0.0;
                                    this.seeds[this.i24] = uni;
                                    this.i24 = this.next[this.i24];
                                    this.j24 = this.next[this.j24];
                                }
                            }
                            this.kount++;
                            if (this.kount >= Ranlux.igiga) {
                                this.mkount++;
                                this.kount -= Ranlux.igiga;
                            }
                            return out;
                        };
                        Ranlux.prototype.init_arrays = function () {
                            this.iseeds = new Array(24 + 1);
                            this.isdext = new Array(25 + 1);
                            this.next = new Array(24 + 1);
                            this.seeds = new Array(24 + 1);
                        };
                        Ranlux.prototype.rluxdef = function () {
                            var lp;
                            var i;
                            var k;
                            this.jseed = Ranlux.jsdflt;
                            this.inseed = this.jseed;
                            this.diag("RANLUX DEFAULT INITIALIZATION: " + this.jseed);
                            this.luxlev = Ranlux.lxdflt;
                            this.nskip = Ranlux.ndskip_$LI$()[this.luxlev];
                            lp = this.nskip + 24;
                            this.in24 = 0;
                            this.kount = 0;
                            this.mkount = 0;
                            this.diag("RANLUX DEFAULT LUXURY LEVEL =  " + this.luxlev + "    p = " + lp);
                            this.twom24 = 1.0;
                            for (i = 1; i <= 24; i++) {
                                this.twom24 = this.twom24 * 0.5;
                                k = (this.jseed / 53668 | 0);
                                this.jseed = 40014 * (this.jseed - k * 53668) - k * 12211;
                                if (this.jseed < 0)
                                    this.jseed = this.jseed + Ranlux.icons;
                                this.iseeds[i] = this.jseed % Ranlux.itwo24_$LI$();
                            }
                            this.twom12 = this.twom24 * 4096.0;
                            for (i = 1; i <= 24; i++) {
                                this.seeds[i] = this.iseeds[i] * this.twom24;
                                this.next[i] = i - 1;
                            }
                            this.next[1] = 24;
                            this.i24 = 24;
                            this.j24 = 10;
                            this.carry = 0.0;
                            if (this.seeds[24] === 0.0)
                                this.carry = this.twom24;
                        };
                        Ranlux.prototype.rluxgo = function (lux, ins) {
                            var ilx;
                            var i;
                            var iouter;
                            var isk;
                            var k;
                            var inner;
                            var izip;
                            var izip2;
                            var uni;
                            if (lux < 0) {
                                this.luxlev = Ranlux.lxdflt;
                            }
                            else if (lux <= Ranlux.maxlev) {
                                this.luxlev = lux;
                            }
                            else if (lux < 24 || lux > 2000) {
                                this.luxlev = Ranlux.maxlev;
                                this.diag("RANLUX ILLEGAL LUXURY RLUXGO: " + lux);
                            }
                            else {
                                this.luxlev = lux;
                                for (ilx = 0; ilx <= Ranlux.maxlev; ilx++)
                                    if (lux === Ranlux.ndskip_$LI$()[ilx] + 24)
                                        this.luxlev = ilx;
                            }
                            if (this.luxlev <= Ranlux.maxlev) {
                                this.nskip = Ranlux.ndskip_$LI$()[this.luxlev];
                                this.diag("RANLUX LUXURY LEVEL SET BY RLUXGO : " + this.luxlev + " P= " + (this.nskip + 24));
                            }
                            else {
                                this.nskip = this.luxlev - 24;
                                this.diag("RANLUX P-VALUE SET BY RLUXGO TO: " + this.luxlev);
                            }
                            this.in24 = 0;
                            if (ins < 0)
                                this.diag("Illegal initialization by RLUXGO, negative input seed");
                            if (ins > 0) {
                                this.jseed = ins;
                                this.diag("RANLUX INITIALIZED BY RLUXGO FROM SEED " + this.jseed);
                            }
                            else {
                                this.jseed = Ranlux.jsdflt;
                                this.diag("RANLUX INITIALIZED BY RLUXGO FROM DEFAULT SEED");
                            }
                            this.inseed = this.jseed;
                            this.twom24 = 1.0;
                            for (i = 1; i <= 24; i++) {
                                this.twom24 = this.twom24 * 0.5;
                                k = (this.jseed / 53668 | 0);
                                this.jseed = 40014 * (this.jseed - k * 53668) - k * 12211;
                                if (this.jseed < 0)
                                    this.jseed = this.jseed + Ranlux.icons;
                                this.iseeds[i] = this.jseed % Ranlux.itwo24_$LI$();
                            }
                            this.twom12 = this.twom24 * 4096;
                            for (i = 1; i <= 24; i++) {
                                this.seeds[i] = this.iseeds[i] * this.twom24;
                                this.next[i] = i - 1;
                            }
                            this.next[1] = 24;
                            this.i24 = 24;
                            this.j24 = 10;
                            this.carry = 0.0;
                            if (this.seeds[24] === 0.0)
                                this.carry = this.twom24;
                            this.kount = 0;
                            this.mkount = 0;
                        };
                        Ranlux.prototype.diag = function (s) {
                            if (this.diagOn)
                                console.error(s);
                        };
                        /**
                         * Maximum luxury level: <CODE>maxlev=4</CODE>
                         */
                        Ranlux.maxlev = 4;
                        /**
                         * Default luxury level: <CODE>lxdflt=3</CODE>
                         */
                        Ranlux.lxdflt = 3;
                        Ranlux.igiga = 1000000000;
                        Ranlux.jsdflt = 314159265;
                        Ranlux.twop12 = 4096;
                        Ranlux.icons = 2147483563;
                        return Ranlux;
                    }(edu.cornell.lassp.houle.RngPack.RandomSeedable));
                    RngPack.Ranlux = Ranlux;
                    Ranlux["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranlux";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     *
                     * Ranecu is an advanced multiplicative linear congruential random number
                     * generator with a period of aproximately 10<SUP>18</SUP>. Ranecu is a direct
                     * translation from Fortran of the <B>RANECU</B> subroutine published in the
                     * paper <BR>
                     * F. James, <CITE>Comp. Phys. Comm.</CITE> <STRONG>60</STRONG> (1990) p 329-344
                     * <BR>
                     * The algorithm was originally described in <BR>
                     * P. L'Ecuyer, <CITE>Commun. ACM.</CITE> <STRONG>1988</STRONG> (1988) p 742
                     * <BR>
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/Ranecu.java"> Source
                     * code </A> is available.
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     */
                    var Ranecu = (function (_super) {
                        __extends(Ranecu, _super);
                        /**
                         *
                         * Initialize <BOLD>RANECU</BOLD> with two specified integer seeds. Use this
                         * to introduce repeatable seeds. Equivalent to
                         *
                         * <CODE>Ranecu(s1*(long) Integer.MAX_VALUE)+s2)</CODE>
                         *
                         * @param s1
                         * seed integer 1 (MSW)
                         * @param s2
                         * seed integer 2 (LSW)
                         */
                        function Ranecu(s1, s2) {
                            var _this = this;
                            if (((typeof s1 === 'number') || s1 === null) && ((typeof s2 === 'number') || s2 === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.iseed1 = 0;
                                this.iseed2 = 0;
                                (function () {
                                    _this.iseed1 = s1;
                                    _this.iseed2 = s2;
                                })();
                            }
                            else if (((s1 != null && s1 instanceof java.util.Date) || s1 === null) && s2 === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                var d_2 = __args[0];
                                _super.call(this);
                                this.iseed1 = 0;
                                this.iseed2 = 0;
                                (function () {
                                    _this.iseed1 = ((d_2.getTime() | 0) / javaemul.internal.IntegerHelper.MAX_VALUE | 0);
                                    _this.iseed2 = (d_2.getTime() | 0) % javaemul.internal.IntegerHelper.MAX_VALUE;
                                })();
                            }
                            else if (((typeof s1 === 'number') || s1 === null) && s2 === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                var l_1 = __args[0];
                                _super.call(this);
                                this.iseed1 = 0;
                                this.iseed2 = 0;
                                (function () {
                                    _this.iseed1 = ((l_1 | 0) / javaemul.internal.IntegerHelper.MAX_VALUE | 0);
                                    _this.iseed2 = (l_1 | 0) % javaemul.internal.IntegerHelper.MAX_VALUE;
                                })();
                            }
                            else if (s1 === undefined && s2 === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.iseed1 = 0;
                                this.iseed2 = 0;
                                (function () {
                                    _this.iseed1 = Ranecu.DEFSEED1;
                                    _this.iseed2 = Ranecu.DEFSEED2;
                                })();
                            }
                            else
                                throw new Error('invalid overload');
                        }
                        /**
                         *
                         * @see RandomElement#raw
                         */
                        Ranecu.prototype.raw$ = function () {
                            var k;
                            var iz;
                            k = (this.iseed1 / 53668 | 0);
                            this.iseed1 = 40014 * (this.iseed1 - k * 53668) - k * 12211;
                            if (this.iseed1 < 0)
                                this.iseed1 = this.iseed1 + 2147483563;
                            k = (this.iseed2 / 52774 | 0);
                            this.iseed2 = 40692 * (this.iseed2 - k * 52774) - k * 3791;
                            if (this.iseed2 < 0)
                                this.iseed2 = this.iseed2 + 2147483399;
                            iz = this.iseed1 - this.iseed2;
                            if (iz < 1)
                                iz = iz + 2147483562;
                            return (iz * 4.656613E-10);
                        };
                        /**
                         * This is an inline version that returns an array of doubles for speed.
                         */
                        Ranecu.prototype.raw = function (d, n) {
                            var _this = this;
                            if (((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    var i;
                                    var k;
                                    var iz;
                                    for (i = 0; i < n; i++) {
                                        k = (_this.iseed1 / 53668 | 0);
                                        _this.iseed1 = 40014 * (_this.iseed1 - k * 53668) - k * 12211;
                                        if (_this.iseed1 < 0)
                                            _this.iseed1 = _this.iseed1 + 2147483563;
                                        k = (_this.iseed2 / 52774 | 0);
                                        _this.iseed2 = 40692 * (_this.iseed2 - k * 52774) - k * 3791;
                                        if (_this.iseed2 < 0)
                                            _this.iseed2 = _this.iseed2 + 2147483399;
                                        iz = _this.iseed1 - _this.iseed2;
                                        if (iz < 1)
                                            iz = iz + 2147483562;
                                        d[i] = iz * 4.656613E-10;
                                    }
                                })();
                            }
                            else if (((d != null && d instanceof Array) || d === null) && n === undefined) {
                                return this.raw$double_A(d);
                            }
                            else if (d === undefined && n === undefined) {
                                return this.raw$();
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        /**
                         *
                         * @return the current generator state as a long. Can be used to restart the
                         * generator where one left off.
                         */
                        Ranecu.prototype.getSeed = function () {
                            return this.iseed1 * Math.round(javaemul.internal.IntegerHelper.MAX_VALUE) + this.iseed2;
                        };
                        /**
                         * default iseed1 = 12345
                         */
                        Ranecu.DEFSEED1 = 12345;
                        /**
                         * default iseed2 = 67890
                         */
                        Ranecu.DEFSEED2 = 67890;
                        return Ranecu;
                    }(edu.cornell.lassp.houle.RngPack.RandomSeedable));
                    RngPack.Ranecu = Ranecu;
                    Ranecu["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranecu";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var edu;
(function (edu) {
    var cornell;
    (function (cornell) {
        var lassp;
        (function (lassp) {
            var houle;
            (function (houle) {
                var RngPack;
                (function (RngPack) {
                    /**
                     *
                     * <A HREF="http://www.math.keio.ac.jp/matumoto/emt.htm">Mersenne Twister</A> --
                     * advanced psuedorandom generator with a period of 2<SUP>19937</SUP>-1
                     * <P>
                     *
                     * <P>
                     * <A HREF="/RngPack/src/edu/cornell/lassp/houle/RngPack/RanMT.java"> Source
                     * code </A> is available.
                     * <P>
                     * This class is derived from Sean Luke's
                     * <A HREF="http://www.cs.umd.edu/users/seanl/gp/">implementation</A>
                     *
                     *
                     *
                     *
                     * <h3>License</h3>
                     *
                     * Copyright (c) 2003 by Paul Houle. <br>
                     * Derived from a work copyright (c) 2003 by Sean Luke. <br>
                     * Portions copyright (c) 1993 by Michael Lecuyer. <br>
                     * All rights reserved. <br>
                     *
                     * <p>
                     * Redistribution and use in source and binary forms, with or without
                     * modification, are permitted provided that the following conditions are met:
                     * <ul>
                     * <li>Redistributions of source code must retain the above copyright notice,
                     * this list of conditions and the following disclaimer.
                     * <li>Redistributions in binary form must reproduce the above copyright notice,
                     * this list of conditions and the following disclaimer in the documentation
                     * and/or other materials provided with the distribution.
                     * <li>Neither the name of the copyright owners, their employers, nor the names
                     * of its contributors may be used to endorse or promote products derived from
                     * this software without specific prior written permission.
                     * </ul>
                     * <p>
                     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
                     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
                     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
                     * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNERS OR CONTRIBUTORS BE
                     * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
                     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
                     * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
                     * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
                     * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
                     * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
                     * POSSIBILITY OF SUCH DAMAGE.
                     *
                     *
                     *
                     * @author <A HREF="http://www.honeylocust.com/"> Paul Houle </A> (E-mail:
                     * <A HREF="mailto:paul@honeylocust.com">paul@honeylocust.com</A>)
                     * @version 1.1a
                     */
                    var RanMT = (function (_super) {
                        __extends(RanMT, _super);
                        function RanMT(d) {
                            var _this = this;
                            if (((d != null && d instanceof java.util.Date) || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.mti = 0;
                                (function () {
                                    _this.setSeed(d.getTime());
                                })();
                            }
                            else if (((d != null && d instanceof Array) || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var array_1 = __args[0];
                                _super.call(this);
                                this.mti = 0;
                                (function () {
                                    _this.setSeed(array_1);
                                })();
                            }
                            else if (((typeof d === 'number') || d === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                var seed_1 = __args[0];
                                _super.call(this);
                                this.mti = 0;
                                (function () {
                                    _this.setSeed(seed_1);
                                })();
                            }
                            else if (d === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                _super.call(this);
                                this.mti = 0;
                                (function () {
                                    _this.setSeed(4357);
                                })();
                            }
                            else
                                throw new Error('invalid overload');
                        }
                        RanMT.prototype.setSeed$long = function (seed) {
                            this.mt = new Array(RanMT.N);
                            this.mag01 = new Array(2);
                            this.mag01[0] = 0;
                            this.mag01[1] = RanMT.MATRIX_A;
                            this.mt[0] = ((seed & 268435455) | 0);
                            for (this.mti = 1; this.mti < RanMT.N; this.mti++) {
                                this.mt[this.mti] = (1812433253 * (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)) + this.mti);
                                this.mt[this.mti] &= -1;
                            }
                        };
                        /**
                         * An alternative, more complete, method of seeding the pseudo random number
                         * generator. array must be an array of 624 ints, and they can be any value
                         * as long as they're not *all* zero.
                         */
                        RanMT.prototype.setSeed = function (array) {
                            var _this = this;
                            if (((array != null && array instanceof Array) || array === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                return (function () {
                                    var i;
                                    var j;
                                    var k;
                                    _this.setSeed(19650218);
                                    i = 1;
                                    j = 0;
                                    k = (RanMT.N > array.length ? RanMT.N : array.length);
                                    for (; k !== 0; k--) {
                                        _this.mt[i] = (_this.mt[i] ^ ((_this.mt[i - 1] ^ (_this.mt[i - 1] >>> 30)) * 1664525)) + array[j] + j;
                                        _this.mt[i] &= -1;
                                        i++;
                                        j++;
                                        if (i >= RanMT.N) {
                                            _this.mt[0] = _this.mt[RanMT.N - 1];
                                            i = 1;
                                        }
                                        if (j >= array.length)
                                            j = 0;
                                    }
                                    for (k = RanMT.N - 1; k !== 0; k--) {
                                        _this.mt[i] = (_this.mt[i] ^ ((_this.mt[i - 1] ^ (_this.mt[i - 1] >>> 30)) * 1566083941)) - i;
                                        _this.mt[i] &= -1;
                                        i++;
                                        if (i >= RanMT.N) {
                                            _this.mt[0] = _this.mt[RanMT.N - 1];
                                            i = 1;
                                        }
                                    }
                                    _this.mt[0] = -2147483648;
                                })();
                            }
                            else if (((typeof array === 'number') || array === null)) {
                                return this.setSeed$long(array);
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        RanMT.prototype.raw$ = function () {
                            var y;
                            var z;
                            if (this.mti >= RanMT.N) {
                                var kk = void 0;
                                for (kk = 0; kk < RanMT.N - RanMT.M; kk++) {
                                    y = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                                    this.mt[kk] = this.mt[kk + RanMT.M] ^ (y >>> 1) ^ this.mag01[y & 1];
                                }
                                for (; kk < RanMT.N - 1; kk++) {
                                    y = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                                    this.mt[kk] = this.mt[kk + (RanMT.M - RanMT.N)] ^ (y >>> 1) ^ this.mag01[y & 1];
                                }
                                y = (this.mt[RanMT.N - 1] & RanMT.UPPER_MASK) | (this.mt[0] & RanMT.LOWER_MASK);
                                this.mt[RanMT.N - 1] = this.mt[RanMT.M - 1] ^ (y >>> 1) ^ this.mag01[y & 1];
                                this.mti = 0;
                            }
                            y = this.mt[this.mti++];
                            y ^= y >>> 11;
                            y ^= (y << 7) & RanMT.TEMPERING_MASK_B;
                            y ^= (y << 15) & RanMT.TEMPERING_MASK_C;
                            y ^= (y >>> 18);
                            if (this.mti >= RanMT.N) {
                                var kk = void 0;
                                for (kk = 0; kk < RanMT.N - RanMT.M; kk++) {
                                    z = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                                    this.mt[kk] = this.mt[kk + RanMT.M] ^ (z >>> 1) ^ this.mag01[z & 1];
                                }
                                for (; kk < RanMT.N - 1; kk++) {
                                    z = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                                    this.mt[kk] = this.mt[kk + (RanMT.M - RanMT.N)] ^ (z >>> 1) ^ this.mag01[z & 1];
                                }
                                z = (this.mt[RanMT.N - 1] & RanMT.UPPER_MASK) | (this.mt[0] & RanMT.LOWER_MASK);
                                this.mt[RanMT.N - 1] = this.mt[RanMT.M - 1] ^ (z >>> 1) ^ this.mag01[z & 1];
                                this.mti = 0;
                            }
                            z = this.mt[this.mti++];
                            z ^= z >>> 11;
                            z ^= (z << 7) & RanMT.TEMPERING_MASK_B;
                            z ^= (z << 15) & RanMT.TEMPERING_MASK_C;
                            z ^= (z >>> 18);
                            return (((Math.round((y >>> 6))) << 27) + (z >>> 5)) / (1 << 53);
                        };
                        RanMT.N = 624;
                        RanMT.M = 397;
                        RanMT.MATRIX_A = -1727483681;
                        RanMT.UPPER_MASK = -2147483648;
                        RanMT.LOWER_MASK = 2147483647;
                        RanMT.TEMPERING_MASK_B = -1658038656;
                        RanMT.TEMPERING_MASK_C = -272236544;
                        return RanMT;
                    }(edu.cornell.lassp.houle.RngPack.RandomSeedable));
                    RngPack.RanMT = RanMT;
                    RanMT["__classname"] = "edu.cornell.lassp.houle.RngPack.RanMT";
                })(RngPack = houle.RngPack || (houle.RngPack = {}));
            })(houle = lassp.houle || (lassp.houle = {}));
        })(lassp = cornell.lassp || (cornell.lassp = {}));
    })(cornell = edu.cornell || (edu.cornell = {}));
})(edu || (edu = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var suffixed;
            (function (suffixed) {
                var one_or_more;
                (function (one_or_more) {
                    /**
                     * SuffixedExpression
                     * = expression:PrimaryExpression __ operator:SuffixedOperator
                     * {
                     * var OPS_TO_SUFFIXED_TYPES =
                     * {
                     * "?": "optional",
                     * "*": "zero_or_more",
                     * "+": "one_or_more"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_SUFFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / PrimaryExpression
                     *
                     * @author peter
                     * @see    {@link TZeroOrMore}, {@link TOptional}
                     */
                    var TOneOrMore = (function (_super) {
                        __extends(TOneOrMore, _super);
                        function TOneOrMore() {
                            _super.call(this, false, true);
                        }
                        return TOneOrMore;
                    }(fuzztest.generator.rule.suffixed.VSuffixed));
                    one_or_more.TOneOrMore = TOneOrMore;
                    TOneOrMore["__classname"] = "fuzztest.generator.rule.suffixed.one_or_more.TOneOrMore";
                })(one_or_more = suffixed.one_or_more || (suffixed.one_or_more = {}));
            })(suffixed = rule.suffixed || (rule.suffixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var suffixed;
            (function (suffixed) {
                var optional;
                (function (optional) {
                    /**
                     *
                     * Corresponding PEGjs rule:
                     *
                     * <pre>
                     * SuffixedExpression
                     * = expression:PrimaryExpression __ operator:SuffixedOperator
                     * {
                     * var OPS_TO_SUFFIXED_TYPES =
                     * {
                     * "?": "optional",
                     * "*": "zero_or_more",
                     * "+": "one_or_more"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_SUFFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / PrimaryExpression
                     * </pre>
                     *
                     * @author peter
                     * @see    {@link TZeroOrMore}, {@link TOneOrMore}
                     */
                    var TOptional = (function (_super) {
                        __extends(TOptional, _super);
                        function TOptional() {
                            _super.call(this, true, false);
                        }
                        return TOptional;
                    }(fuzztest.generator.rule.suffixed.VSuffixed));
                    optional.TOptional = TOptional;
                    TOptional["__classname"] = "fuzztest.generator.rule.suffixed.optional.TOptional";
                })(optional = suffixed.optional || (suffixed.optional = {}));
            })(suffixed = rule.suffixed || (rule.suffixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var generator;
    (function (generator) {
        var rule;
        (function (rule) {
            var suffixed;
            (function (suffixed) {
                var zero_or_more;
                (function (zero_or_more) {
                    /**
                     *
                     *
                     * Corresponding PEGjs rule:
                     *
                     * <pre>
                     * SuffixedExpression
                     * = expression:PrimaryExpression __ operator:SuffixedOperator
                     * {
                     * var OPS_TO_SUFFIXED_TYPES =
                     * {
                     * "?": "optional",
                     * "*": "zero_or_more",
                     * "+": "one_or_more"
                     * };
                     *
                     * return
                     * {
                     * type:               OPS_TO_SUFFIXED_TYPES[operator],
                     * expression:         expression,
                     * location:           location ()
                     * };
                     * }
                     * / PrimaryExpression
                     * </pre>
                     *
                     * @author peter
                     * @see    {@link TOptional}, {@link TOneOrMore}
                     */
                    var TZeroOrMore = (function (_super) {
                        __extends(TZeroOrMore, _super);
                        function TZeroOrMore() {
                            _super.call(this, true, true);
                        }
                        return TZeroOrMore;
                    }(fuzztest.generator.rule.suffixed.VSuffixed));
                    zero_or_more.TZeroOrMore = TZeroOrMore;
                    TZeroOrMore["__classname"] = "fuzztest.generator.rule.suffixed.zero_or_more.TZeroOrMore";
                })(zero_or_more = suffixed.zero_or_more || (suffixed.zero_or_more = {}));
            })(suffixed = rule.suffixed || (rule.suffixed = {}));
        })(rule = generator.rule || (generator.rule = {}));
    })(generator = fuzztest.generator || (fuzztest.generator = {}));
})(fuzztest || (fuzztest = {}));
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
var fuzztest;
(function (fuzztest) {
    var utils;
    (function (utils) {
        var gen;
        (function (gen) {
            /**
             * @author peter
             */
            var TGenData = (function () {
                function TGenData() {
                }
                TGenData.gRndGen_$LI$ = function () { if (TGenData.gRndGen == null)
                    TGenData.gRndGen = new edu.cornell.lassp.houle.RngPack.RanMT(); return TGenData.gRndGen; };
                ;
                TGenData.GetBoolean = function () {
                    var ret;
                    ret = TGenData.gRndGen_$LI$().coin();
                    return ret;
                };
                TGenData.GetChar$ = function () {
                    var ret;
                    ret = TGenData._GetChar('\u0000', '\uffff');
                    return ret;
                };
                TGenData.GetChar = function (loChar, hiChar) {
                    if (((typeof loChar === 'string') || loChar === null) && ((typeof hiChar === 'string') || hiChar === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        return (function () {
                            var ret;
                            ret = TGenData._GetChar(loChar, hiChar);
                            return ret;
                        })();
                    }
                    else if (loChar === undefined && hiChar === undefined) {
                        return fuzztest.utils.gen.TGenData.GetChar$();
                    }
                    else
                        throw new Error('invalid overload');
                };
                /**
                 * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
                 * Useful
                 *
                 * @param       maxN    Possible maximum less one.
                 * @return              Random integer in range [0, maxN[
                 */
                TGenData.GetInt$int = function (maxN) {
                    var ret;
                    ret = TGenData._GetInt(0, maxN - 1);
                    return ret;
                };
                /**
                 * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
                 *
                 * @param       min     Possible minimum.
                 * @param       max     Possible maximum.
                 * @return              Random value in range [min, max].
                 */
                TGenData.GetInt = function (min, max) {
                    if (((typeof min === 'number') || min === null) && ((typeof max === 'number') || max === null)) {
                        var __args = Array.prototype.slice.call(arguments);
                        return (function () {
                            var ret;
                            ret = TGenData._GetInt(min, max);
                            return ret;
                        })();
                    }
                    else if (((typeof min === 'number') || min === null) && max === undefined) {
                        return fuzztest.utils.gen.TGenData.GetInt$int(min);
                    }
                    else
                        throw new Error('invalid overload');
                };
                TGenData._GetChar = function (loChar, hiChar) {
                    var x;
                    var ret;
                    x = TGenData.gRndGen_$LI$().choose((loChar).charCodeAt(0), (hiChar).charCodeAt(0));
                    ret = String.fromCharCode(x);
                    return ret;
                };
                /**
                 * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
                 *
                 * @param       min     Possible minimum.
                 * @param       max     Possible maximum.
                 * @return              Random value in range [min, max].
                 */
                TGenData._GetInt = function (min, max) {
                    var ret;
                    ret = TGenData.gRndGen_$LI$().choose(min, max);
                    return ret;
                };
                return TGenData;
            }());
            gen.TGenData = TGenData;
            TGenData["__classname"] = "fuzztest.utils.gen.TGenData";
        })(gen = utils.gen || (utils.gen = {}));
    })(utils = fuzztest.utils || (fuzztest.utils = {}));
})(fuzztest || (fuzztest = {}));
fuzztest.utils.gen.TGenData.gRndGen_$LI$();
edu.cornell.lassp.houle.RngPack.Ranlux.ndskip_$LI$();
edu.cornell.lassp.houle.RngPack.Ranlux.itwo24_$LI$();
fuzztest.TMain.main(null);
