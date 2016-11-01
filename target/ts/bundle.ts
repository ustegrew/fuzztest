/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest {
    /**
     * @author peter
     */
    export class TMain {
        /**
         * @param args
         */
        public static main(args : string[]) {
            let s : fuzztest.generator.rule.TStrategy;
            let cc : fuzztest.generator.rule.cClass.TCharacterClass;
            let p : string;
            cc = new fuzztest.generator.rule.cClass.TCharacterClass();
            cc.AddRange("a", "z");
            cc.AddRange("0", "9");
            cc.AddPoint("_");
            fuzztest.generator.rule.VNode.ClearVisitCounters();
            s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kFollowRule, 10);
            for(let i : number = 1; i <= 50; i++) {
                p = cc.CreateData(s, "");
                java.lang.System.out.print(p);
            }
            console.info();
            fuzztest.generator.rule.VNode.ClearVisitCounters();
            s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kInjectInvalids, 10);
            for(let i : number = 1; i <= 50; i++) {
                p = cc.CreateData(s, "");
                java.lang.System.out.print(p);
            }
            console.info();
        }
    }
    TMain["__classname"] = "fuzztest.TMain";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.store {
    /**
     * A poor man's implementation of java.util.ArrayList. I could try and import j4ts, but I got loads of
     * transpilation errors. I have a feeling that writing this impl is getting faster results than
     * trying to make j4ts to work.
     * 
     * @author peter
     */
    export class TArrayList<T> {
        private fElements : Array<T>;

        private fNumElements : number;

        public constructor() {
            this.fNumElements = 0;
            this.fElements = <any>(new Array<any>());
            this.fNumElements = 0;
        }

        public Add(obj : T) {
            this.fElements.push(obj);
            this.fNumElements++;
        }

        public Get(i : number) : T {
            let ret : T;
            this._AssertIndexOK(i);
            ret = this.fElements[i];
            return ret;
        }

        public GetNumElements() : number {
            return this.fNumElements;
        }

        private _AssertIndexOK(i : number) {
            if(i < 0 || i >= this.fNumElements) {
                throw new Error("Index out of bounds. Must be in [0, " + this.fNumElements + "[. Given: " + i);
            }
        }
    }
    TArrayList["__classname"] = "fuzztest.utils.store.TArrayList";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.store {
    /**
     * A poor man's implementation of java.util.HashMap. I could try and import j4ts, but I got loads of
     * transpilation errors. I have a feeling that writing this impl is getting faster results than
     * trying to make j4ts to work.
     * 
     * @author peter
     */
    export class THashMap<T> {
        private fElements : Object;

        private fNumElements : number;

        public constructor() {
            this.fNumElements = 0;
            this.fElements = <Object>new Object();
            this.fNumElements = 0;
        }

        public Get(key : string) : T {
            let ret : T;
            this._AssertHasElement(key, false);
            ret = <T>this.fElements[key];
            return ret;
        }

        public GetNumElements() : number {
            return this.fNumElements;
        }

        public HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fElements.hasOwnProperty(key);
            return ret;
        }

        public Set(key : string, obj : T) {
            this._AssertHasElement(key, true);
            this.fElements[key] = obj;
            this.fNumElements++;
        }

        private _AssertHasElement(key : string, doInverse : boolean) {
            let hasElement : boolean;
            hasElement = this.fElements.hasOwnProperty(key);
            if(doInverse) {
                if(hasElement) {
                    throw new Error("Duplicate key: \'" + key + "\'");
                }
            } else {
                if(!hasElement) {
                    throw new Error("Unknown key: \'" + key + "\'");
                }
            }
        }
    }
    THashMap["__classname"] = "fuzztest.utils.store.THashMap";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.store {
    /**
     * @author peter
     */
    export class TArrayMap<T> {
        private fHashMap : fuzztest.utils.store.THashMap<T>;

        private fArrayList : fuzztest.utils.store.TArrayList<T>;

        public constructor() {
            this.fHashMap = <any>(new fuzztest.utils.store.THashMap<any>());
            this.fArrayList = <any>(new fuzztest.utils.store.TArrayList<any>());
        }

        public Add(key : string, obj : T) {
            this.fHashMap.Set(key, obj);
            this.fArrayList.Add(obj);
        }

        public Get(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : T;
                    ret = this.fHashMap.Get(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>this.Get$int(key);
            } else throw new Error('invalid overload');
        }

        public Get$int(i : number) : T {
            let ret : T;
            ret = this.fArrayList.Get(i);
            return ret;
        }

        public GetNumElements() : number {
            let ret : number;
            ret = this.fArrayList.GetNumElements();
            return ret;
        }

        public HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fHashMap.HasElement(key);
            return ret;
        }
    }
    TArrayMap["__classname"] = "fuzztest.utils.store.TArrayMap";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator {
    /**
     * The central repository holding references to all {@link VBrowseable} objects.
     * Implemented as global singleton, i.e. anyone can query the repository for stored
     * objects.
     * Each object is identified by key and by index. Indices are zero based and follow
     * append order, i.e. the object appended first has index zero, next object has index one etc.
     * 
     * @author peter
     */
    export class TRepository {
        static gRepository : TRepository = null;

        /**
         * Adds an object to the repository. The object must have it's key property set prior to adding.
         * 
         * @param   b                           The object to be stored.
         * @return                              The stored object's key.
         * @throws  IllegalArgumentException    if the object's key isn't set or there's already another object
         * stored with the same key.
         */
        public static Add(b : fuzztest.generator.VBrowseable) : string {
            let ret : string;
            TRepository._CreateRepository();
            ret = TRepository.gRepository._Add(b);
            return ret;
        }

        /**
         * Returns the object with the given index.
         * 
         * @param   i   Index of the object requested.
         * @return      Object being requested.
         * @throws  IllegalArgumentException if the index is out of range.
         */
        public static Get$int(i : number) : fuzztest.generator.VBrowseable {
            let ret : fuzztest.generator.VBrowseable;
            TRepository._CreateRepository();
            ret = TRepository.gRepository._GetElement(i);
            return ret;
        }

        /**
         * Returns the object with the given key.
         * 
         * @param   key     Key of the object requested.
         * @return          Object being requested.
         * @throws  IllegalArgumentException if the key has an invalid value or
         * there isn't any object with that key.
         */
        public static Get(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.generator.VBrowseable;
                    TRepository._CreateRepository();
                    ret = TRepository.gRepository._GetElement(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>fuzztest.generator.TRepository.Get$int(key);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns a list of keys of objects that are of the same class as the given {@link VBrowseable}.
         * 
         * @param   b   The {@link VBrowseable} whose class we are querying.
         * @return      A list of keys of objects that are of the given class.
         */
        public static GetKeys$fuzztest_generator_classing_TClass(c : fuzztest.generator.classing.TClass) : fuzztest.utils.store.TArrayList<string> {
            let ret : fuzztest.utils.store.TArrayList<string>;
            TRepository._CreateRepository();
            ret = TRepository.gRepository._GetKeys(c, true);
            return ret;
        }

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
        public static GetKeys(c? : any, isStrict? : any) : any {
            if(((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && ((typeof isStrict === 'boolean') || isStrict === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.utils.store.TArrayList<string>;
                    TRepository._CreateRepository();
                    ret = TRepository.gRepository._GetKeys(c, isStrict);
                    return ret;
                })();
            } else if(((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && isStrict === undefined) {
                return <any>fuzztest.generator.TRepository.GetKeys$fuzztest_generator_classing_TClass(c);
            } else throw new Error('invalid overload');
        }

        /**
         * @return  The number of objects stored in the repository.
         */
        public static GetNumElements() : number {
            let ret : number;
            TRepository._CreateRepository();
            ret = TRepository.gRepository._GetNumElements();
            return ret;
        }

        /**
         * Returns <code>true</code> if there is an object with the given key, <code>false</code> otherwise.
         * 
         * @param   key     The key being queried
         * @return          <code>true</code> if there is an object with the given
         * key, <code>false</code> otherwise.
         */
        public static HasElement(key : string) : boolean {
            let ret : boolean;
            TRepository._CreateRepository();
            ret = TRepository.gRepository._HasElement(key);
            return ret;
        }

        /**
         * Creates a new repository (singleton) if none existed before.
         */
        private static _CreateRepository() {
            if(TRepository.gRepository == null) {
                TRepository.gRepository = new TRepository();
            }
        }

        private fRepository : fuzztest.utils.store.TArrayMap<fuzztest.generator.VBrowseable>;

        constructor() {
            this.fRepository = <any>(new fuzztest.utils.store.TArrayMap<any>());
        }

        private _Add(b : fuzztest.generator.VBrowseable) : string {
            let key : string;
            key = b.GetKey();
            this.fRepository.Add(key, b);
            return key;
        }

        private _GetElement$int(i : number) : fuzztest.generator.VBrowseable {
            let ret : fuzztest.generator.VBrowseable;
            ret = this.fRepository.Get(i);
            return ret;
        }

        public _GetElement(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.generator.VBrowseable;
                    ret = this.fRepository.Get(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>this._GetElement$int(key);
            } else throw new Error('invalid overload');
        }

        private _GetKeys(c : fuzztest.generator.classing.TClass, isStrict : boolean) : fuzztest.utils.store.TArrayList<string> {
            let i : number;
            let n : number;
            let b0 : fuzztest.generator.VBrowseable;
            let c0 : fuzztest.generator.classing.TClass;
            let isClass : boolean;
            let key : string;
            let ret : fuzztest.utils.store.TArrayList<string>;
            ret = <any>(new fuzztest.utils.store.TArrayList<any>());
            n = this.fRepository.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    b0 = this.fRepository.Get(i);
                    c0 = b0.GetClass();
                    isClass = isStrict?c.IsEqualTo(c0):c.IsEqualToOrDerivedFrom(c0);
                    if(isClass) {
                        key = b0.GetKey();
                        ret.Add(key);
                    }
                }
            }
            return ret;
        }

        private _GetNumElements() : number {
            let ret : number;
            ret = this.fRepository.GetNumElements();
            return ret;
        }

        private _HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fRepository.HasElement(key);
            return ret;
        }
    }
    TRepository["__classname"] = "fuzztest.generator.TRepository";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.primitive {
    /**
     * @author peter
     */
    export class TOnceAssignable<T> {
        private fElement : T;

        public constructor() {
            this.fElement = null;
        }

        public Set(element : T) {
            if(this.fElement != null) {
                throw new java.lang.IllegalArgumentException("Element can only be set once.");
            }
            this.fElement = element;
        }

        public Get() : T {
            if(this.fElement == null) {
                throw new java.lang.IllegalStateException("Cannot retrieve unset element.");
            }
            return this.fElement;
        }
    }
    TOnceAssignable["__classname"] = "fuzztest.generator.primitive.TOnceAssignable";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator {
    /**
     * Browseable object, i.e. can be stored in the {@link TRepository}. Provides
     * manual and automatic key generation.
     * 
     * @author peter
     */
    export abstract class VBrowseable {
        static gCounter : number = -1;

        private fClass : fuzztest.generator.classing.TClass;

        private fKey : string;

        /**
         * cTor.
         */
        constructor() {
            this.fClass = fuzztest.generator.classing.TClass.Create(this);
            this.fKey = null;
        }

        public GetClass() : fuzztest.generator.classing.TClass {
            return this.fClass;
        }

        /**
         * @return      The key associated with this object.
         */
        public GetKey() : string {
            return this.fKey;
        }

        public _Register(key : string = null, doAutoKey : boolean = true) {
            let k : string;
            if(this.fKey != null) {
                throw new java.lang.IllegalArgumentException("Key is already assigned.");
            }
            if(doAutoKey) {
                k = this.fClass.GetName();
                VBrowseable.gCounter++;
                this.fKey = k + "_" + VBrowseable.gCounter;
            } else {
                this.fKey = key;
            }
            fuzztest.generator.TRepository.Add(this);
        }
    }
    VBrowseable["__classname"] = "fuzztest.generator.VBrowseable";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.classing {
    /**
     * @author peter
     */
    export class TInheritChain {
        public static kPathSeparator : string = ".";

        private fChain : fuzztest.utils.store.TArrayMap<fuzztest.generator.classing.TClass>;

        public constructor(obj : Object) {
            this.fChain = <any>(new fuzztest.utils.store.TArrayMap<any>());
            this._Build(obj);
        }

        public GetAsString() : string {
            let i : number;
            let n : number;
            let c : fuzztest.generator.classing.TClass;
            let ret : string;
            ret = "";
            n = this.fChain.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    c = this.fChain.Get(i);
                    ret += c.GetName();
                    if(i < n - 1) {
                        ret += TInheritChain.kPathSeparator;
                    }
                }
            }
            return ret;
        }

        /**
         * Returns the i-th parent in this inheritance chain.
         * 
         * @param   i   The number of generations above. Zero is the first parent generation, 1 the one above etc.
         * @return      The parent class that it i generations above the class hosting this chain.
         */
        public GetLink(i : number) : fuzztest.generator.classing.TClass {
            let ret : fuzztest.generator.classing.TClass;
            ret = this.fChain.Get(i);
            return ret;
        }

        public GetNumLinks() : number {
            let ret : number;
            ret = this.fChain.GetNumElements();
            return ret;
        }

        public IsLink(c : fuzztest.generator.classing.TClass) : boolean {
            let i : number;
            let n : number;
            let c0 : fuzztest.generator.classing.TClass;
            let cID : string;
            let cID0 : string;
            let ret : boolean;
            ret = false;
            n = this.fChain.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    c0 = this.fChain.Get(i);
                    cID = c.GetName();
                    cID0 = c0.GetName();
                    ret = ret || (cID === cID0);
                }
            }
            return ret;
        }

        private _Build(obj : Object) {
            let cls : fuzztest.generator.classing.TClass;
            let instance : Object;
            let key : string;
            instance = obj;
            while((instance != null)){
                instance = <Object>instance["__proto__"];
                cls = new fuzztest.generator.classing.TClass(instance);
                key = cls.GetName();
                this.fChain.Add(key, cls);
            };
        }
    }
    TInheritChain["__classname"] = "fuzztest.generator.classing.TInheritChain";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.classing {
    /**
     * @author peter
     */
    export class TClass {
        public static Create(obj : fuzztest.generator.VBrowseable) : TClass {
            let obj0 : Object;
            let ret : TClass;
            obj0 = <Object>(<any>obj);
            ret = new TClass(obj0);
            return ret;
        }

        private fInherits : fuzztest.generator.classing.TInheritChain;

        private fName : string;

        constructor(obj : Object) {
            this._Init(obj);
        }

        public GetName() : string {
            return this.fName;
        }

        public GetParent() : TClass {
            let nLinks : number;
            let ret : TClass;
            nLinks = this.fInherits.GetNumLinks();
            ret = null;
            if(nLinks >= 1) {
                ret = this.fInherits.GetLink(0);
            }
            return ret;
        }

        public IsEqualTo(other : TClass) : boolean {
            let ret : boolean;
            ret = this._IsEqualTo(other);
            return ret;
        }

        public IsEqualToOrDerivedFrom(other : TClass) : boolean {
            let isEq : boolean;
            let isDer : boolean;
            let ret : boolean;
            isEq = this._IsEqualTo(other);
            isDer = this.fInherits.IsLink(other);
            ret = isEq || isDer;
            return ret;
        }

        private _IsEqualTo(other : TClass) : boolean {
            let path0 : string;
            let path1 : string;
            let ret : boolean;
            path0 = this._GetCanonicalName();
            path1 = other._GetCanonicalName();
            ret = (path0 === path1);
            return ret;
        }

        /**
         * @return
         */
        private _GetCanonicalName() : string {
            let n : number;
            let ret : string;
            n = this.fInherits.GetNumLinks();
            if(n >= 1) {
                ret = this.fInherits.GetAsString();
                ret += fuzztest.generator.classing.TInheritChain.kPathSeparator;
                ret += this.fName;
            } else {
                ret = this.fName;
            }
            return ret;
        }

        private _Init(obj : Object) {
            let p : Object;
            let c : Object;
            p = <Object>obj["__proto__"];
            c = <Object>p["constructor"];
            this.fName = <string>c["name"];
            this.fInherits = new fuzztest.generator.classing.TInheritChain(obj);
        }
    }
    TClass["__classname"] = "fuzztest.generator.classing.TClass";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export abstract class VCharSet {
        public abstract GetChar(s : fuzztest.generator.rule.TStrategy) : string;
    }
    VCharSet["__classname"] = "fuzztest.generator.rule.cClass.VCharSet";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule {
    /**
     * Code generation strategies.
     * 
     * @author peter
     */
    export enum ERuleAdhesion {
        kFollowRule, kInjectInvalids, kFollowOpposite
    }
}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule {
    /**
     * @author peter
     */
    export class TStrategy {
        private fRecursionCounter : number;

        private fRecursionMax : number;

        private fRuleAdhesion : fuzztest.generator.rule.ERuleAdhesion;

        private fRepeatMax : number;

        public constructor(recursionMax : number, ruleAdhesion : fuzztest.generator.rule.ERuleAdhesion, repeatMax : number) {
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
        public CanEnter() : boolean {
            let ret : boolean;
            ret = (this.fRecursionCounter <= this.fRecursionMax);
            return ret;
        }

        public GetRuleAdhesion() : fuzztest.generator.rule.ERuleAdhesion {
            return this.fRuleAdhesion;
        }

        public GetNumRepeatsMax() : number {
            return this.fRepeatMax;
        }

        public GetNumVisitsMax() : number {
            return this.fRecursionMax;
        }

        private _AssertParamsOK(recursionMax : number, ruleAdhesion : fuzztest.generator.rule.ERuleAdhesion, repeatMax : number) {
            console.info("Warning: TStrategy::_AssertParamsOK(...): Must implement.");
        }
    }
    TStrategy["__classname"] = "fuzztest.generator.rule.TStrategy";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export abstract class RandomElement {
        BMoutput : number;

        /**
         * The abstract method that must be defined to make a working RandomElement.
         * See the class <CODE>RandomJava</CODE> for an example of how to do this.
         * 
         * @see RandomJava
         * 
         * @return a random double in the range [0,1]
         */
        public raw$() : number { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

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
        public raw(d? : any, n? : any) : any {
            if(((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    for(let i : number = 0; i < n; i++) d[i] = this.raw()
                })();
            } else if(((d != null && d instanceof Array) || d === null) && n === undefined) {
                return <any>this.raw$double_A(d);
            } else if(d === undefined && n === undefined) {
                return <any>this.raw$();
            } else throw new Error('invalid overload');
        }

        /**
         * Fill an entire array with doubles. This method calls
         * <CODE>raw(double d[],int n)</CODE> with <CODE>d=d.length</CODE>. Since
         * this adds little overhead for <CODE>d.length</CODE> large, it is only
         * necessary to override <CODE>raw(double d[],int n)</CODE>
         * 
         * @param d
         * array to be filled with doubles.
         */
        public raw$double_A(d : number[]) {
            this.raw(d, d.length);
        }

        /**
         * @param hi
         * upper limit of range
         * @return a random integer in the range 1,2,... ,<STRONG>hi</STRONG>
         */
        public choose$int(hi : number) : number {
            return this.choose(1, hi);
        }

        /**
         * @param lo
         * lower limit of range
         * @param hi
         * upper limit of range
         * @return a random integer in the range <STRONG>lo</STRONG>,
         * <STRONG>lo</STRONG>+1, ... ,<STRONG>hi</STRONG>
         */
        public choose(lo? : any, hi? : any) : any {
            if(((typeof lo === 'number') || lo === null) && ((typeof hi === 'number') || hi === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let value : number = lo + (<number>((hi - lo) * this.raw())|0);
                    if(value > hi) value = hi;
                    return value;
                })();
            } else if(((typeof lo === 'number') || lo === null) && hi === undefined) {
                return <any>this.choose$int(lo);
            } else throw new Error('invalid overload');
        }

        /**
         * @return a boolean that's true 0.5 of the time; equivalent to coin(0.5).
         */
        public coin$() : boolean {
            return this.raw() <= 0.5;
        }

        /**
         * @param p
         * probability that function will return true
         * @return a boolean that's true p of the time.
         */
        public coin(p? : any) : any {
            if(((typeof p === 'number') || p === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return this.raw() <= p;
                })();
            } else if(p === undefined) {
                return <any>this.coin$();
            } else throw new Error('invalid overload');
        }

        /**
         * @param lo
         * lower limit of range
         * @param hi
         * upper limit of range
         * @return a uniform random real in the range [<STRONG>lo</STRONG>,
         * <STRONG>hi</STRONG>]
         */
        public uniform(lo : number, hi : number) : number {
            return (lo + (hi - lo) * this.raw());
        }

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
        public powlaw(alpha : number, cut : number) : number {
            return cut * Math.pow(this.raw(), 1.0 / (alpha + 1.0));
        }

        constructor() {
        }
    }
    RandomElement["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomElement";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule {
    /**
     * @author peter
     */
    export abstract class VNode extends fuzztest.generator.VBrowseable {
        public static ClearVisitCounters() {
            let i : number;
            let n : number;
            let k : string;
            let nd : VNode;
            let ns : fuzztest.generator.rule.TNodeSurrogate;
            let clVNodeS : fuzztest.generator.classing.TClass;
            let clVNode : fuzztest.generator.classing.TClass;
            let keys : fuzztest.utils.store.TArrayList<string>;
            ns = new fuzztest.generator.rule.TNodeSurrogate();
            clVNodeS = ns.GetClass();
            clVNode = clVNodeS.GetParent();
            keys = fuzztest.generator.TRepository.GetKeys(clVNode, false);
            n = keys.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    k = keys.Get(i);
                    nd = <VNode>fuzztest.generator.TRepository.Get(k);
                    nd.ClearVisitCounter();
                }
            }
        }

        public static DoesFollowRule(s : fuzztest.generator.rule.TStrategy) : boolean {
            let r : fuzztest.generator.rule.ERuleAdhesion;
            let ret : boolean;
            r = s.GetRuleAdhesion();
            if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) {
                ret = true;
            } else if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowOpposite) {
                ret = false;
            } else {
                ret = fuzztest.utils.gen.TGenData.GetBoolean();
            }
            return ret;
        }

        private fExpression : fuzztest.generator.primitive.TOnceAssignable<VNode>;

        private fNumVisits : number;

        public constructor(key? : any) {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.fNumVisits = 0;
                (() => {
                    this.fNumVisits = 0;
                    this._Register(key);
                })();
            } else if(key === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.fNumVisits = 0;
                (() => {
                    this.fNumVisits = 0;
                    this.fExpression = <any>(new fuzztest.generator.primitive.TOnceAssignable<any>());
                    this._Register();
                })();
            } else throw new Error('invalid overload');
        }

        public ClearVisitCounter() {
            this.fNumVisits = 0;
        }

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
        public CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let nVisitsMax : number;
            let ret : string;
            nVisitsMax = s.GetNumVisitsMax();
            if(this.fNumVisits <= nVisitsMax) {
                this.fNumVisits++;
                ret = this._CreateData(s, head);
            } else {
                ret = head;
            }
            return ret;
        }

        public SetExpression(node : VNode) {
            this.fExpression.Set(node);
        }

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
        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let ex : VNode;
            let ret : string;
            ex = this.fExpression.Get();
            ret = ex.CreateData(s, head);
            return ret;
        }

        _GetExpression() : VNode {
            let ret : VNode;
            ret = this.fExpression.Get();
            return ret;
        }

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
        _GetFromOppositeSet() : VNode {
            let c : fuzztest.generator.classing.TClass;
            let i : number;
            let n : number;
            let kThis : string;
            let kOther : string;
            let hasKey : boolean;
            let isEqual : boolean;
            let refs : fuzztest.utils.store.TArrayList<string>;
            let ret : VNode;
            kThis = this.GetKey();
            c = this.GetClass();
            refs = fuzztest.generator.TRepository.GetKeys(c);
            n = refs.GetNumElements();
            ret = null;
            if(n >= 1) {
                hasKey = false;
                do {
                    i = fuzztest.utils.gen.TGenData.GetInt(n);
                    kOther = refs.Get(i);
                    isEqual = (kThis === kOther);
                    hasKey = !isEqual;
                } while((!hasKey));
                ret = <VNode>fuzztest.generator.TRepository.Get(kOther);
            } else {
                ret = <VNode>fuzztest.generator.TRepository.Get(kThis);
            }
            return ret;
        }
    }
    VNode["__classname"] = "fuzztest.generator.rule.VNode";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export class TCharacterRange extends fuzztest.generator.rule.cClass.VCharSet {
        private fHiChar : string;

        private fLoChar : string;

        public constructor(loChar : string, hiChar : string) {
            super();
            this.fHiChar = null;
            this.fLoChar = null;
            this._AssertOk(loChar, hiChar);
            this.fLoChar = loChar.charAt(0);
            this.fHiChar = hiChar.charAt(0);
        }

        public GetChar(s : fuzztest.generator.rule.TStrategy) : string {
            let doFollow : boolean;
            let doHead : boolean;
            let loChar : string;
            let hiChar : string;
            let ret : string;
            doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
            if(doFollow) {
                ret = fuzztest.utils.gen.TGenData.GetChar(this.fLoChar, this.fHiChar);
            } else {
                if(this.fLoChar === '\u0000' && this.fHiChar === '\uffff') {
                    ret = fuzztest.utils.gen.TGenData.GetChar();
                } else if(this.fLoChar === '\u0000') {
                    loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                } else if(this.fHiChar === '\uffff') {
                    hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                    ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                } else {
                    doHead = fuzztest.utils.gen.TGenData.GetBoolean();
                    if(doHead) {
                        hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                    } else {
                        loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                    }
                }
            }
            return ret;
        }

        /**
         * @param loChar
         * @param hiChar
         */
        private _AssertOk(loChar : string, hiChar : string) {
            let l1 : number;
            let l2 : number;
            let order : number;
            l1 = loChar.length;
            l2 = hiChar.length;
            order = /* compareTo */hiChar.localeCompare(loChar);
            if(l1 !== 1) {
                throw new java.lang.IllegalArgumentException("For loChar: Use string of length 1 (single character string).");
            }
            if(l2 !== 1) {
                throw new java.lang.IllegalArgumentException("For hiChar: Use string of length 1 (single character string).");
            }
            if(order <= 0) {
                throw new java.lang.IllegalArgumentException("loChar must lexically precede hiChar.");
            }
        }
    }
    TCharacterRange["__classname"] = "fuzztest.generator.rule.cClass.TCharacterRange";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export class TCharacterPoint extends fuzztest.generator.rule.cClass.VCharSet {
        private fChar : string;

        public constructor(ch : string) {
            super();
            this.fChar = null;
            this._AssertOK(ch);
            this.fChar = ch.charAt(0);
        }

        public GetChar(s : fuzztest.generator.rule.TStrategy) : string {
            let doFollow : boolean;
            let doHead : boolean;
            let loChar : string;
            let hiChar : string;
            let ret : string;
            doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
            if(doFollow) {
                ret = this.fChar;
            } else {
                if(this.fChar === '\u0000') {
                    loChar = '\u0001';
                    hiChar = '\uffff';
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                } else if(this.fChar === '\uffff') {
                    loChar = '\u0000';
                    hiChar = '\ufffe';
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                } else {
                    doHead = fuzztest.utils.gen.TGenData.GetBoolean();
                    if(doHead) {
                        loChar = '\u0000';
                        hiChar = String.fromCharCode(((this.fChar).charCodeAt(0) - 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                    } else {
                        loChar = String.fromCharCode(((this.fChar).charCodeAt(0) + 1));
                        hiChar = <string>('\uffff');
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                    }
                }
            }
            return ret;
        }

        /**
         * @param ch
         */
        private _AssertOK(ch : string) {
            let l : number;
            l = ch.length;
            if(l !== 1) {
                throw new java.lang.IllegalArgumentException("For ch: Use string of length 1 (single character string).");
            }
        }
    }
    TCharacterPoint["__classname"] = "fuzztest.generator.rule.cClass.TCharacterPoint";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class RandomShuffle extends edu.cornell.lassp.houle.RngPack.RandomElement {
        generatorA : edu.cornell.lassp.houle.RngPack.RandomElement;

        generatorB : edu.cornell.lassp.houle.RngPack.RandomElement;

        decksize : number;

        deck : number[];

        /**
         * @param ga
         * generator to fill shuffle deck
         * @param gb
         * geberator to choose from shuffle deck
         * @param ds
         * the size of the shuffle deck
         */
        public constructor(ga : edu.cornell.lassp.houle.RngPack.RandomElement, gb : edu.cornell.lassp.houle.RngPack.RandomElement, ds : number) {
            super();
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
        public raw$() : number {
            let random : number;
            let i : number;
            i = this.generatorB.choose(0, this.decksize - 1);
            random = this.deck[i];
            this.deck[i] = this.generatorA.raw();
            return random;
        }

        private stackdeck() {
            let i : number;
            this.deck = new Array(this.decksize);
            for(i = 0; i < this.decksize; i++) this.deck[i] = this.generatorA.raw()
        }
    }
    RandomShuffle["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomShuffle";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class RandomJava extends edu.cornell.lassp.houle.RngPack.RandomElement {
        /**
         * Wrapper for <CODE>Math.random().</CODE>
         * 
         * @see RandomElement#raw
         */
        public raw$() : number {
            return Math.random();
        }
    }
    RandomJava["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomJava";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export abstract class RandomSeedable extends edu.cornell.lassp.houle.RngPack.RandomElement {
        /**
         * 
         * Return a long integer seed given a date
         * 
         * @param d
         * a date
         * @return a long integer seed
         */
        public static ClockSeed(d? : any) : any {
            if(((d != null && d instanceof java.util.Date) || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    return d.getTime();
                })();
            } else if(d === undefined) {
                return <any>edu.cornell.lassp.houle.RngPack.RandomSeedable.ClockSeed$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * Return a long integer seed calculated from the date. Equivalent to
         * <CODE>ClockSeed(new Date());
         * 
         * @return a long integer seed
         */
        public static ClockSeed$() : number {
            return RandomSeedable.ClockSeed(new java.util.Date());
        }
    }
    RandomSeedable["__classname"] = "edu.cornell.lassp.houle.RngPack.RandomSeedable";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.labelled {
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
    export class TLabelled extends fuzztest.generator.rule.VNode {
        private fLabel : fuzztest.generator.primitive.TOnceAssignable<string>;

        public constructor() {
            super();
            this.fLabel = <any>(new fuzztest.generator.primitive.TOnceAssignable<any>());
        }

        public GetLabel() : string {
            let ret : string;
            ret = this.fLabel.Get();
            return ret;
        }

        public SetLabel(label : string) {
            this.fLabel.Set(label);
        }
    }
    TLabelled["__classname"] = "fuzztest.generator.rule.labelled.TLabelled";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.semanticPredicate.semantic_not {
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
    export class TSemanticNot extends fuzztest.generator.rule.VNode {    }
    TSemanticNot["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.semanticPredicate.semantic_and {
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
    export class TSemanticAnd extends fuzztest.generator.rule.VNode {    }
    TSemanticAnd["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.rule_ref {
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
    export class TReference extends fuzztest.generator.rule.VNode {    }
    TReference["__classname"] = "fuzztest.generator.rule.rule_ref.TReference";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
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
    export class TCharacterClass extends fuzztest.generator.rule.VNode {
        private fSets : java.util.ArrayList<fuzztest.generator.rule.cClass.VCharSet>;

        /**
         * cTor.
         */
        public constructor() {
            super();
            this.fSets = <any>(new java.util.ArrayList<any>());
        }

        public AddPoint(ch : string) {
            let set : fuzztest.generator.rule.cClass.TCharacterPoint;
            set = new fuzztest.generator.rule.cClass.TCharacterPoint(ch);
            this.fSets.add(set);
        }

        /**
         * @param string
         * @param string2
         */
        public AddRange(loChar : string, hiChar : string) {
            let set : fuzztest.generator.rule.cClass.TCharacterRange;
            set = new fuzztest.generator.rule.cClass.TCharacterRange(loChar, hiChar);
            this.fSets.add(set);
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let n : number;
            let cs : fuzztest.generator.rule.cClass.VCharSet;
            let x : number;
            let ret : string;
            n = this.fSets.size();
            if(n >= 1) {
                x = fuzztest.utils.gen.TGenData.GetInt(n);
                cs = this.fSets.get(x);
                ret = head + cs.GetChar(s);
            } else {
                ret = head;
            }
            return ret;
        }
    }
    TCharacterClass["__classname"] = "fuzztest.generator.rule.cClass.TCharacterClass";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.simple_not {
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
    export class TSimpleNot extends fuzztest.generator.rule.VNode {    }
    TSimpleNot["__classname"] = "fuzztest.generator.rule.prefixed.simple_not.TSimpleNot";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.text {
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
    export class TText extends fuzztest.generator.rule.VNode {    }
    TText["__classname"] = "fuzztest.generator.rule.prefixed.text.TText";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.simple_and {
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
    export class TSimpleAnd extends fuzztest.generator.rule.VNode {    }
    TSimpleAnd["__classname"] = "fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.sequence {
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
    export class TSequence extends fuzztest.generator.rule.VNode {
        private fElements : java.util.ArrayList<fuzztest.generator.rule.VNode>;

        public constructor() {
            super();
            this.fElements = <any>(new java.util.ArrayList<any>());
        }

        public Add(element : fuzztest.generator.rule.VNode) {
            this.fElements.add(element);
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let i : number;
            let n : number;
            let e : fuzztest.generator.rule.VNode;
            let ret : string;
            ret = head;
            n = this.fElements.size();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    e = this.fElements.get(i);
                    ret = ret + e.CreateData(s, "");
                }
            }
            return ret;
        }
    }
    TSequence["__classname"] = "fuzztest.generator.rule.sequence.TSequence";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.expression {
    /**
     * Corresponding PEGjs rule:
     * <pre>
     * Expression
     * = ChoiceExpression
     * </pre>
     * @author peter
     */
    export class TExpression extends fuzztest.generator.rule.VNode {    }
    TExpression["__classname"] = "fuzztest.generator.rule.expression.TExpression";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.grammar {
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
    export class TGrammar extends fuzztest.generator.rule.VNode {
        static kKeyStart : string = "start";

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let rStart : fuzztest.generator.rule.rule.TRule;
            let ret : string;
            rStart = <fuzztest.generator.rule.rule.TRule>fuzztest.generator.TRepository.Get(TGrammar.kKeyStart);
            ret = rStart.CreateData(s, head);
            return ret;
        }
    }
    TGrammar["__classname"] = "fuzztest.generator.rule.grammar.TGrammar";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.initializer {
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
    export class TInitializer extends fuzztest.generator.rule.VNode {    }
    TInitializer["__classname"] = "fuzztest.generator.rule.initializer.TInitializer";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule {
    /**
     * A dummy class which allows us to create a concrete VNode.
     * 
     * @author peter
     */
    export class TNodeSurrogate extends fuzztest.generator.rule.VNode {    }
    TNodeSurrogate["__classname"] = "fuzztest.generator.rule.TNodeSurrogate";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.literal {
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
    export class TLiteral extends fuzztest.generator.rule.VNode {
        private fLiteral : string;

        /**
         * 
         */
        public constructor(literal : string) {
            super();
            this.fLiteral = literal;
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let doFollow : boolean;
            let lit : TLiteral;
            let ret : string;
            doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
            if(doFollow) {
                lit = this;
            } else {
                lit = <TLiteral>this._GetFromOppositeSet();
            }
            ret = head + lit.fLiteral;
            return ret;
        }
    }
    TLiteral["__classname"] = "fuzztest.generator.rule.literal.TLiteral";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.action {
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
    export class TAction extends fuzztest.generator.rule.VNode {    }
    TAction["__classname"] = "fuzztest.generator.rule.action.TAction";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.named {
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
    export class TNamed extends fuzztest.generator.rule.VNode {
        private fName : fuzztest.generator.primitive.TOnceAssignable<string>;

        public constructor() {
            super();
            this.fName = <any>(new fuzztest.generator.primitive.TOnceAssignable<any>());
        }

        public GetName() : string {
            let ret : string;
            ret = this.fName.Get();
            return ret;
        }

        public SetName(name : string) {
            this.fName.Set(name);
        }
    }
    TNamed["__classname"] = "fuzztest.generator.rule.named.TNamed";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.choice {
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
    export class TChoice extends fuzztest.generator.rule.VNode {
        private fBranches : java.util.ArrayList<fuzztest.generator.rule.VNode>;

        /**
         * 
         */
        public constructor() {
            super();
            this.fBranches = <any>(new java.util.ArrayList<any>());
        }

        public AddExpression(node : fuzztest.generator.rule.VNode) {
            this.fBranches.add(node);
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let i : number;
            let n : number;
            let node : fuzztest.generator.rule.VNode;
            let ret : string;
            n = this.fBranches.size();
            if(n >= 1) {
                i = fuzztest.utils.gen.TGenData.GetInt(n);
                node = this.fBranches.get(i);
                ret = node.CreateData(s, head);
            } else {
                ret = head;
            }
            return ret;
        }
    }
    TChoice["__classname"] = "fuzztest.generator.rule.choice.TChoice";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.group {
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
    export class TGroup extends fuzztest.generator.rule.VNode {    }
    TGroup["__classname"] = "fuzztest.generator.rule.group.TGroup";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.rule {
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
    export class TRule extends fuzztest.generator.rule.VNode {
        public constructor(key : string) {
            super(key);
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let doFollow : boolean;
            let ref : TRule;
            let expr : fuzztest.generator.rule.VNode;
            let ret : string;
            doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);
            if(doFollow) {
                ref = this;
            } else {
                ref = <TRule>this._GetFromOppositeSet();
            }
            expr = ref._GetExpression();
            ret = expr.CreateData(s, head);
            return ret;
        }
    }
    TRule["__classname"] = "fuzztest.generator.rule.rule.TRule";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.any {
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
    export class TAny extends fuzztest.generator.rule.VNode {
        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let ret : string;
            ret = head + fuzztest.utils.gen.TGenData.GetChar();
            return ret;
        }
    }
    TAny["__classname"] = "fuzztest.generator.rule.any.TAny";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed {
    /**
     * @author peter
     */
    export abstract class VSuffixed extends fuzztest.generator.rule.VNode {
        private fIsNMinZero : boolean;

        private fIsNMaxInfinite : boolean;

        public constructor(isNMinZero : boolean, isNMaxInfinite : boolean) {
            super();
            this.fIsNMinZero = false;
            this.fIsNMaxInfinite = false;
            this.fIsNMinZero = isNMinZero;
            this.fIsNMaxInfinite = isNMaxInfinite;
        }

        _CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {
            let r : fuzztest.generator.rule.ERuleAdhesion;
            let ex : fuzztest.generator.rule.VNode;
            let doBreakRule : boolean;
            let nMin : number;
            let nMax : number;
            let n : number;
            let i : number;
            let ret : string;
            doBreakRule = true;
            r = s.GetRuleAdhesion();
            if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) {
                doBreakRule = false;
            } else {
                doBreakRule = fuzztest.utils.gen.TGenData.GetBoolean();
            }
            n = 0;
            if(doBreakRule) {
                nMin = 0;
                nMax = 0;
                if(this.fIsNMinZero && !this.fIsNMaxInfinite) {
                    nMax = 1;
                } else if(!this.fIsNMinZero && this.fIsNMaxInfinite) {
                    nMax = 0;
                } else if(this.fIsNMinZero && this.fIsNMaxInfinite) {
                    nMax = s.GetNumRepeatsMax();
                }
                if(nMax >= 1) {
                    n = fuzztest.utils.gen.TGenData.GetInt(nMin, nMax);
                }
            } else {
                nMin = this.fIsNMinZero?0:1;
                nMax = this.fIsNMaxInfinite?s.GetNumRepeatsMax():1;
                n = fuzztest.utils.gen.TGenData.GetInt(nMin, nMax);
            }
            ret = head;
            if(n >= 1) {
                ex = this._GetExpression();
                for(i = 1; i <= n; i++) {
                    ret = ret + ex.CreateData(s, "");
                }
            }
            return ret;
        }
    }
    VSuffixed["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class Ranmar extends edu.cornell.lassp.houle.RngPack.RandomSeedable {
        c : number;

        cd : number;

        cm : number;

        u : number[];

        uvec : number[];

        i97 : number;

        j97 : number;

        /**
         * Default seed. <CODE>DEFSEED=54217137</CODE>
         */
        public static DEFSEED : number = 54217137;

        /**
         * The 46,009,220nd prime number, he largest prime less than 9*10
         * <SUP>8</SUP>. Used as a modulus because this version of <TT>RANMAR</TT>
         * needs a seed between 0 and 9*10<SUP>8</SUP> and <CODE>BIG_PRIME</CODE>
         * isn't commensurate with any regular period.
         * <CODE>BIG_PRIME= 899999963</CODE>
         */
        public static BIG_PRIME : number = 899999963;

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
        public constructor(d? : any) {
            if(((d != null && d instanceof java.util.Date) || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.c = 0;
                this.cd = 0;
                this.cm = 0;
                this.i97 = 0;
                this.j97 = 0;
                (() => {
                    this.ranmarin((<number>RandomSeedable.ClockSeed(d)|0) % Ranmar.BIG_PRIME);
                })();
            } else if(((typeof d === 'number') || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let ijkl : any = __args[0];
                super();
                this.c = 0;
                this.cd = 0;
                this.cm = 0;
                this.i97 = 0;
                this.j97 = 0;
                (() => {
                    this.ranmarin(Math.abs(ijkl % Ranmar.BIG_PRIME));
                })();
            } else if(((typeof d === 'number') || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let ijkl : any = __args[0];
                super();
                this.c = 0;
                this.cd = 0;
                this.cm = 0;
                this.i97 = 0;
                this.j97 = 0;
                (() => {
                    this.ranmarin((<number>Math.abs(ijkl % Ranmar.BIG_PRIME)|0));
                })();
            } else if(d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.c = 0;
                this.cd = 0;
                this.cm = 0;
                this.i97 = 0;
                this.j97 = 0;
                (() => {
                    this.ranmarin(Ranmar.DEFSEED);
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * Internal methods: ranmarin is the initialization code for the generator.
         */
        ranmarin(ijkl : number) {
            let ij : number;
            let kl : number;
            let i : number;
            let ii : number;
            let j : number;
            let jj : number;
            let k : number;
            let l : number;
            let m : number;
            let s : number;
            let t : number;
            this.u = new Array(97);
            this.uvec = new Array(97);
            ij = (ijkl / 30082|0);
            kl = ijkl - 30082 * ij;
            i = (((ij / 177|0)) % 177) + 2;
            j = (ij % 177) + 2;
            k = (((kl / 169|0)) % 178) + 1;
            l = kl % 169;
            for(ii = 0; ii < 97; ii++) {
                s = 0.0;
                t = 0.5;
                for(jj = 0; jj < 24; jj++) {
                    m = (((i * j) % 179) * k) % 179;
                    i = j;
                    j = k;
                    k = m;
                    l = (53 * l + 1) % 169;
                    if(((l * m) % 64) >= 32) s += t;
                    t *= 0.5;
                }
                this.u[ii] = s;
            }
            this.c = 362436.0 / 1.6777216E7;
            this.cd = 7654321.0 / 1.6777216E7;
            this.cm = 1.6777213E7 / 1.6777216E7;
            this.i97 = 96;
            this.j97 = 32;
        }

        /**
         * The generator
         * 
         * @return a pseudo random number
         */
        public raw$() : number {
            let uni : number;
            uni = this.u[this.i97] - this.u[this.j97];
            if(uni < 0.0) uni += 1.0;
            this.u[this.i97] = uni;
            if(--this.i97 < 0) this.i97 = 96;
            if(--this.j97 < 0) this.j97 = 96;
            this.c -= this.cd;
            if(this.c < 0.0) this.c += this.cm;
            uni -= this.c;
            if(uni < 0.0) uni += 1.0;
            return (uni);
        }

        /**
         * 
         * A version of the generator for filling arrays, inlined for speed
         * 
         * @param d
         * an array of doubles to be filled
         * @param n
         * size of the array
         */
        public raw(d? : any, n? : any) : any {
            if(((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let uni : number;
                    for(let i : number = 0; i < n; i++) {
                        uni = this.u[this.i97] - this.u[this.j97];
                        if(uni < 0.0) uni += 1.0;
                        this.u[this.i97] = uni;
                        if(--this.i97 < 0) this.i97 = 96;
                        if(--this.j97 < 0) this.j97 = 96;
                        this.c -= this.cd;
                        if(this.c < 0.0) this.c += this.cm;
                        uni -= this.c;
                        if(uni < 0.0) uni += 1.0;
                        d[i] = uni;
                    }
                })();
            } else if(((d != null && d instanceof Array) || d === null) && n === undefined) {
                return <any>this.raw$double_A(d);
            } else if(d === undefined && n === undefined) {
                return <any>this.raw$();
            } else throw new Error('invalid overload');
        }
    }
    Ranmar["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranmar";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class Ranlux extends edu.cornell.lassp.houle.RngPack.RandomSeedable {
        /**
         * Maximum luxury level: <CODE>maxlev=4</CODE>
         */
        public static maxlev : number = 4;

        /**
         * Default luxury level: <CODE>lxdflt=3</CODE>
         */
        public static lxdflt : number = 3;

        static igiga : number = 1000000000;

        static jsdflt : number = 314159265;

        static twop12 : number = 4096;

        static itwo24 : number; public static itwo24_$LI$() : number { if(Ranlux.itwo24 == null) Ranlux.itwo24 = 1 << 24; return Ranlux.itwo24; };

        static icons : number = 2147483563;

        static ndskip : number[]; public static ndskip_$LI$() : number[] { if(Ranlux.ndskip == null) Ranlux.ndskip = [0, 24, 73, 199, 365]; return Ranlux.ndskip; };

        iseeds : number[];

        isdext : number[];

        next : number[];

        luxlev : number;

        nskip : number;

        inseed : number;

        jseed : number;

        in24 : number;

        kount : number;

        mkount : number;

        i24 : number;

        j24 : number;

        seeds : number[];

        carry : number;

        twom24 : number;

        twom12 : number;

        diagOn : boolean;

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
        public constructor(lux? : any, d? : any) {
            if(((typeof lux === 'number') || lux === null) && ((d != null && d instanceof java.util.Date) || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(lux, (<number>(RandomSeedable.ClockSeed(d) % javaemul.internal.IntegerHelper.MAX_VALUE)|0));
                })();
            } else if(((typeof lux === 'number') || lux === null) && ((typeof d === 'number') || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let ins : any = __args[1];
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(lux, Math.abs(ins));
                })();
            } else if(((typeof lux === 'number') || lux === null) && ((typeof d === 'number') || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let ins : any = __args[1];
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(lux, Math.abs((<number>(ins % javaemul.internal.IntegerHelper.MAX_VALUE)|0)));
                })();
            } else if(((lux != null && lux instanceof java.util.Date) || lux === null) && d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let d : any = __args[0];
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(Ranlux.lxdflt, (<number>(RandomSeedable.ClockSeed(d) % javaemul.internal.IntegerHelper.MAX_VALUE)|0));
                })();
            } else if(((typeof lux === 'number') || lux === null) && d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let ins : any = __args[0];
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(Ranlux.lxdflt, Math.abs(ins));
                })();
            } else if(((typeof lux === 'number') || lux === null) && d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let ins : any = __args[0];
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxgo(Ranlux.lxdflt, Math.abs((<number>(ins % javaemul.internal.IntegerHelper.MAX_VALUE)|0)));
                })();
            } else if(lux === undefined && d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.luxlev = Ranlux.lxdflt;
                this.in24 = 0;
                this.kount = 0;
                this.mkount = 0;
                this.i24 = 24;
                this.j24 = 10;
                this.carry = <number>0.0;
                this.diagOn = false;
                this.nskip = 0;
                this.inseed = 0;
                this.jseed = 0;
                this.twom24 = 0;
                this.twom12 = 0;
                (() => {
                    this.init_arrays();
                    this.rluxdef();
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Turns diagnostic messages on and off. If <TT>setDiag(true)</TT> is
         * called, <TT>RANLUX</TT> will print diagnostic information to
         * <TT>System.err</TT>
         * 
         * @param b
         * diagnostic message status
         */
        public setDiag(b : boolean) {
            this.diagOn = b;
        }

        /**
         * 
         * The random number generator.
         * 
         * @returns a pseudo-random double in the range (0,1)
         */
        public raw$() : number {
            let i : number;
            let k : number;
            let lp : number;
            let uni : number;
            let out : number;
            uni = this.seeds[this.j24] - this.seeds[this.i24] - this.carry;
            if(uni < <number>0.0) {
                uni = uni + <number>1.0;
                this.carry = this.twom24;
            } else this.carry = <number>0.0;
            this.seeds[this.i24] = uni;
            this.i24 = this.next[this.i24];
            this.j24 = this.next[this.j24];
            out = uni;
            if(uni < this.twom12) out += this.twom24 * this.seeds[this.j24];
            if(out === 0.0) out = this.twom24 * this.twom24;
            this.in24++;
            if(this.in24 === 24) {
                this.in24 = 0;
                this.kount += this.nskip;
                for(i = 1; i <= this.nskip; i++) {
                    uni = this.seeds[this.j24] - this.seeds[this.i24] - this.carry;
                    if(uni < <number>0.0) {
                        uni = uni + <number>1.0;
                        this.carry = this.twom24;
                    } else this.carry = <number>0.0;
                    this.seeds[this.i24] = uni;
                    this.i24 = this.next[this.i24];
                    this.j24 = this.next[this.j24];
                }
            }
            this.kount++;
            if(this.kount >= Ranlux.igiga) {
                this.mkount++;
                this.kount -= Ranlux.igiga;
            }
            return out;
        }

        private init_arrays() {
            this.iseeds = new Array(24 + 1);
            this.isdext = new Array(25 + 1);
            this.next = new Array(24 + 1);
            this.seeds = new Array(24 + 1);
        }

        private rluxdef() {
            let lp : number;
            let i : number;
            let k : number;
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
            this.twom24 = <number>1.0;
            for(i = 1; i <= 24; i++) {
                this.twom24 = this.twom24 * <number>0.5;
                k = (this.jseed / 53668|0);
                this.jseed = 40014 * (this.jseed - k * 53668) - k * 12211;
                if(this.jseed < 0) this.jseed = this.jseed + Ranlux.icons;
                this.iseeds[i] = this.jseed % Ranlux.itwo24_$LI$();
            }
            this.twom12 = this.twom24 * <number>4096.0;
            for(i = 1; i <= 24; i++) {
                this.seeds[i] = this.iseeds[i] * this.twom24;
                this.next[i] = i - 1;
            }
            this.next[1] = 24;
            this.i24 = 24;
            this.j24 = 10;
            this.carry = <number>0.0;
            if(this.seeds[24] === 0.0) this.carry = this.twom24;
        }

        private rluxgo(lux : number, ins : number) {
            let ilx : number;
            let i : number;
            let iouter : number;
            let isk : number;
            let k : number;
            let inner : number;
            let izip : number;
            let izip2 : number;
            let uni : number;
            if(lux < 0) {
                this.luxlev = Ranlux.lxdflt;
            } else if(lux <= Ranlux.maxlev) {
                this.luxlev = lux;
            } else if(lux < 24 || lux > 2000) {
                this.luxlev = Ranlux.maxlev;
                this.diag("RANLUX ILLEGAL LUXURY RLUXGO: " + lux);
            } else {
                this.luxlev = lux;
                for(ilx = 0; ilx <= Ranlux.maxlev; ilx++) if(lux === Ranlux.ndskip_$LI$()[ilx] + 24) this.luxlev = ilx;
            }
            if(this.luxlev <= Ranlux.maxlev) {
                this.nskip = Ranlux.ndskip_$LI$()[this.luxlev];
                this.diag("RANLUX LUXURY LEVEL SET BY RLUXGO : " + this.luxlev + " P= " + (this.nskip + 24));
            } else {
                this.nskip = this.luxlev - 24;
                this.diag("RANLUX P-VALUE SET BY RLUXGO TO: " + this.luxlev);
            }
            this.in24 = 0;
            if(ins < 0) this.diag("Illegal initialization by RLUXGO, negative input seed");
            if(ins > 0) {
                this.jseed = ins;
                this.diag("RANLUX INITIALIZED BY RLUXGO FROM SEED " + this.jseed);
            } else {
                this.jseed = Ranlux.jsdflt;
                this.diag("RANLUX INITIALIZED BY RLUXGO FROM DEFAULT SEED");
            }
            this.inseed = this.jseed;
            this.twom24 = <number>1.0;
            for(i = 1; i <= 24; i++) {
                this.twom24 = this.twom24 * <number>0.5;
                k = (this.jseed / 53668|0);
                this.jseed = 40014 * (this.jseed - k * 53668) - k * 12211;
                if(this.jseed < 0) this.jseed = this.jseed + Ranlux.icons;
                this.iseeds[i] = this.jseed % Ranlux.itwo24_$LI$();
            }
            this.twom12 = this.twom24 * 4096;
            for(i = 1; i <= 24; i++) {
                this.seeds[i] = this.iseeds[i] * this.twom24;
                this.next[i] = i - 1;
            }
            this.next[1] = 24;
            this.i24 = 24;
            this.j24 = 10;
            this.carry = <number>0.0;
            if(this.seeds[24] === 0.0) this.carry = this.twom24;
            this.kount = 0;
            this.mkount = 0;
        }

        private diag(s : string) {
            if(this.diagOn) console.error(s);
        }
    }
    Ranlux["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranlux";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class Ranecu extends edu.cornell.lassp.houle.RngPack.RandomSeedable {
        iseed1 : number;

        iseed2 : number;

        /**
         * default iseed1 = 12345
         */
        public static DEFSEED1 : number = 12345;

        /**
         * default iseed2 = 67890
         */
        public static DEFSEED2 : number = 67890;

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
        public constructor(s1? : any, s2? : any) {
            if(((typeof s1 === 'number') || s1 === null) && ((typeof s2 === 'number') || s2 === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.iseed1 = 0;
                this.iseed2 = 0;
                (() => {
                    this.iseed1 = s1;
                    this.iseed2 = s2;
                })();
            } else if(((s1 != null && s1 instanceof java.util.Date) || s1 === null) && s2 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let d : any = __args[0];
                super();
                this.iseed1 = 0;
                this.iseed2 = 0;
                (() => {
                    this.iseed1 = ((<number>d.getTime()|0) / javaemul.internal.IntegerHelper.MAX_VALUE|0);
                    this.iseed2 = (<number>d.getTime()|0) % javaemul.internal.IntegerHelper.MAX_VALUE;
                })();
            } else if(((typeof s1 === 'number') || s1 === null) && s2 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let l : any = __args[0];
                super();
                this.iseed1 = 0;
                this.iseed2 = 0;
                (() => {
                    this.iseed1 = ((<number>l|0) / javaemul.internal.IntegerHelper.MAX_VALUE|0);
                    this.iseed2 = (<number>l|0) % javaemul.internal.IntegerHelper.MAX_VALUE;
                })();
            } else if(s1 === undefined && s2 === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.iseed1 = 0;
                this.iseed2 = 0;
                (() => {
                    this.iseed1 = Ranecu.DEFSEED1;
                    this.iseed2 = Ranecu.DEFSEED2;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @see RandomElement#raw
         */
        public raw$() : number {
            let k : number;
            let iz : number;
            k = (this.iseed1 / 53668|0);
            this.iseed1 = 40014 * (this.iseed1 - k * 53668) - k * 12211;
            if(this.iseed1 < 0) this.iseed1 = this.iseed1 + 2147483563;
            k = (this.iseed2 / 52774|0);
            this.iseed2 = 40692 * (this.iseed2 - k * 52774) - k * 3791;
            if(this.iseed2 < 0) this.iseed2 = this.iseed2 + 2147483399;
            iz = this.iseed1 - this.iseed2;
            if(iz < 1) iz = iz + 2147483562;
            return (iz * 4.656613E-10);
        }

        /**
         * This is an inline version that returns an array of doubles for speed.
         */
        public raw(d? : any, n? : any) : any {
            if(((d != null && d instanceof Array) || d === null) && ((typeof n === 'number') || n === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let i : number;
                    let k : number;
                    let iz : number;
                    for(i = 0; i < n; i++) {
                        k = (this.iseed1 / 53668|0);
                        this.iseed1 = 40014 * (this.iseed1 - k * 53668) - k * 12211;
                        if(this.iseed1 < 0) this.iseed1 = this.iseed1 + 2147483563;
                        k = (this.iseed2 / 52774|0);
                        this.iseed2 = 40692 * (this.iseed2 - k * 52774) - k * 3791;
                        if(this.iseed2 < 0) this.iseed2 = this.iseed2 + 2147483399;
                        iz = this.iseed1 - this.iseed2;
                        if(iz < 1) iz = iz + 2147483562;
                        d[i] = iz * 4.656613E-10;
                    }
                })();
            } else if(((d != null && d instanceof Array) || d === null) && n === undefined) {
                return <any>this.raw$double_A(d);
            } else if(d === undefined && n === undefined) {
                return <any>this.raw$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @return the current generator state as a long. Can be used to restart the
         * generator where one left off.
         */
        public getSeed() : number {
            return this.iseed1 * Math.round(<number>javaemul.internal.IntegerHelper.MAX_VALUE) + this.iseed2;
        }
    }
    Ranecu["__classname"] = "edu.cornell.lassp.houle.RngPack.Ranecu";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace edu.cornell.lassp.houle.RngPack {
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
    export class RanMT extends edu.cornell.lassp.houle.RngPack.RandomSeedable {
        static N : number = 624;

        static M : number = 397;

        static MATRIX_A : number = -1727483681;

        static UPPER_MASK : number = -2147483648;

        static LOWER_MASK : number = 2147483647;

        static TEMPERING_MASK_B : number = -1658038656;

        static TEMPERING_MASK_C : number = -272236544;

        private mt : number[];

        private mti : number;

        private mag01 : number[];

        public constructor(d? : any) {
            if(((d != null && d instanceof java.util.Date) || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.mti = 0;
                (() => {
                    this.setSeed(d.getTime());
                })();
            } else if(((d != null && d instanceof Array) || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let array : any = __args[0];
                super();
                this.mti = 0;
                (() => {
                    this.setSeed(array);
                })();
            } else if(((typeof d === 'number') || d === null)) {
                let __args = Array.prototype.slice.call(arguments);
                let seed : any = __args[0];
                super();
                this.mti = 0;
                (() => {
                    this.setSeed(seed);
                })();
            } else if(d === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                super();
                this.mti = 0;
                (() => {
                    this.setSeed(4357);
                })();
            } else throw new Error('invalid overload');
        }

        private setSeed$long(seed : number) {
            this.mt = new Array(RanMT.N);
            this.mag01 = new Array(2);
            this.mag01[0] = 0;
            this.mag01[1] = RanMT.MATRIX_A;
            this.mt[0] = (<number>(seed & 268435455)|0);
            for(this.mti = 1; this.mti < RanMT.N; this.mti++) {
                this.mt[this.mti] = (1812433253 * (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)) + this.mti);
                this.mt[this.mti] &= -1;
            }
        }

        /**
         * An alternative, more complete, method of seeding the pseudo random number
         * generator. array must be an array of 624 ints, and they can be any value
         * as long as they're not *all* zero.
         */
        public setSeed(array? : any) : any {
            if(((array != null && array instanceof Array) || array === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let i : number;
                    let j : number;
                    let k : number;
                    this.setSeed(19650218);
                    i = 1;
                    j = 0;
                    k = (RanMT.N > array.length?RanMT.N:array.length);
                    for(; k !== 0; k--) {
                        this.mt[i] = (this.mt[i] ^ ((this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) * 1664525)) + array[j] + j;
                        this.mt[i] &= -1;
                        i++;
                        j++;
                        if(i >= RanMT.N) {
                            this.mt[0] = this.mt[RanMT.N - 1];
                            i = 1;
                        }
                        if(j >= array.length) j = 0;
                    }
                    for(k = RanMT.N - 1; k !== 0; k--) {
                        this.mt[i] = (this.mt[i] ^ ((this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) * 1566083941)) - i;
                        this.mt[i] &= -1;
                        i++;
                        if(i >= RanMT.N) {
                            this.mt[0] = this.mt[RanMT.N - 1];
                            i = 1;
                        }
                    }
                    this.mt[0] = -2147483648;
                })();
            } else if(((typeof array === 'number') || array === null)) {
                return <any>this.setSeed$long(array);
            } else throw new Error('invalid overload');
        }

        public raw$() : number {
            let y : number;
            let z : number;
            if(this.mti >= RanMT.N) {
                let kk : number;
                for(kk = 0; kk < RanMT.N - RanMT.M; kk++) {
                    y = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                    this.mt[kk] = this.mt[kk + RanMT.M] ^ (y >>> 1) ^ this.mag01[y & 1];
                }
                for(; kk < RanMT.N - 1; kk++) {
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
            if(this.mti >= RanMT.N) {
                let kk : number;
                for(kk = 0; kk < RanMT.N - RanMT.M; kk++) {
                    z = (this.mt[kk] & RanMT.UPPER_MASK) | (this.mt[kk + 1] & RanMT.LOWER_MASK);
                    this.mt[kk] = this.mt[kk + RanMT.M] ^ (z >>> 1) ^ this.mag01[z & 1];
                }
                for(; kk < RanMT.N - 1; kk++) {
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
            return (((Math.round(<number>(y >>> 6))) << 27) + (z >>> 5)) / <number>(1 << 53);
        }
    }
    RanMT["__classname"] = "edu.cornell.lassp.houle.RngPack.RanMT";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.one_or_more {
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
    export class TOneOrMore extends fuzztest.generator.rule.suffixed.VSuffixed {
        public constructor() {
            super(false, true);
        }
    }
    TOneOrMore["__classname"] = "fuzztest.generator.rule.suffixed.one_or_more.TOneOrMore";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.optional {
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
    export class TOptional extends fuzztest.generator.rule.suffixed.VSuffixed {
        public constructor() {
            super(true, false);
        }
    }
    TOptional["__classname"] = "fuzztest.generator.rule.suffixed.optional.TOptional";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.zero_or_more {
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
    export class TZeroOrMore extends fuzztest.generator.rule.suffixed.VSuffixed {
        public constructor() {
            super(true, true);
        }
    }
    TZeroOrMore["__classname"] = "fuzztest.generator.rule.suffixed.zero_or_more.TZeroOrMore";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.gen {
    /**
     * @author peter
     */
    export class TGenData {
        static gRndGen : edu.cornell.lassp.houle.RngPack.RanMT; public static gRndGen_$LI$() : edu.cornell.lassp.houle.RngPack.RanMT { if(TGenData.gRndGen == null) TGenData.gRndGen = new edu.cornell.lassp.houle.RngPack.RanMT(); return TGenData.gRndGen; };

        public static GetBoolean() : boolean {
            let ret : boolean;
            ret = TGenData.gRndGen_$LI$().coin();
            return ret;
        }

        public static GetChar$() : string {
            let ret : string;
            ret = TGenData._GetChar('\u0000', '\uffff');
            return ret;
        }

        public static GetChar(loChar? : any, hiChar? : any) : any {
            if(((typeof loChar === 'string') || loChar === null) && ((typeof hiChar === 'string') || hiChar === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : string;
                    ret = TGenData._GetChar(loChar, hiChar);
                    return ret;
                })();
            } else if(loChar === undefined && hiChar === undefined) {
                return <any>fuzztest.utils.gen.TGenData.GetChar$();
            } else throw new Error('invalid overload');
        }

        /**
         * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
         * Useful
         * 
         * @param       maxN    Possible maximum less one.
         * @return              Random integer in range [0, maxN[
         */
        public static GetInt$int(maxN : number) : number {
            let ret : number;
            ret = TGenData._GetInt(0, maxN - 1);
            return ret;
        }

        /**
         * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
         * 
         * @param       min     Possible minimum.
         * @param       max     Possible maximum.
         * @return              Random value in range [min, max].
         */
        public static GetInt(min? : any, max? : any) : any {
            if(((typeof min === 'number') || min === null) && ((typeof max === 'number') || max === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : number;
                    ret = TGenData._GetInt(min, max);
                    return ret;
                })();
            } else if(((typeof min === 'number') || min === null) && max === undefined) {
                return <any>fuzztest.utils.gen.TGenData.GetInt$int(min);
            } else throw new Error('invalid overload');
        }

        private static _GetChar(loChar : string, hiChar : string) : string {
            let x : number;
            let ret : string;
            x = TGenData.gRndGen_$LI$().choose((loChar).charCodeAt(0), (hiChar).charCodeAt(0));
            ret = String.fromCharCode(x);
            return ret;
        }

        /**
         * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
         * 
         * @param       min     Possible minimum.
         * @param       max     Possible maximum.
         * @return              Random value in range [min, max].
         */
        private static _GetInt(min : number, max : number) : number {
            let ret : number;
            ret = TGenData.gRndGen_$LI$().choose(min, max);
            return ret;
        }
    }
    TGenData["__classname"] = "fuzztest.utils.gen.TGenData";

}


fuzztest.utils.gen.TGenData.gRndGen_$LI$();

edu.cornell.lassp.houle.RngPack.Ranlux.ndskip_$LI$();

edu.cornell.lassp.houle.RngPack.Ranlux.itwo24_$LI$();

fuzztest.TMain.main(null);