














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest {     

      
      
      





/**
 * @author peter
 */
export class TMain {         




/**
 * @param args
 */
public static main(args : string[]) {             

fuzztest._dev_concepts.math.rnd.TDevRnd_01.RunRnd_01();             
fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01.TestTree01();             
fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.CreateType();         }     }     TMain["__classname"] = "fuzztest.TMain";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest._dev_concepts.grammar.build {     

      
      
      
      






/**
 * Concept test: Build grammar tree
 * 
 * @author peter
 */
export class TDevBuildGrammar_01 {         

public static TestTree01() {             

var s : fuzztest.generator.rule.TStrategy;             
var cc : fuzztest.generator.rule.cClass.TCharacterClass;             
var p : string;             

cc = new fuzztest.generator.rule.cClass.TCharacterClass();             
cc.AddRange("a", "z");             
cc.AddRange("0", "9");             
cc.AddPoint("_");             

fuzztest.generator.rule.VNode.ClearVisitCounters();             
s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kFollowRule, 10);             
for(var i : number = 1; i <= 50; i++) 
{                 
p = cc.CreateData(s, "");                 
java.lang.System.out.print(p);             }             

console.info();             

fuzztest.generator.rule.VNode.ClearVisitCounters();             
s = new fuzztest.generator.rule.TStrategy(9, fuzztest.generator.rule.ERuleAdhesion.kInjectInvalids, 10);             
for(var i : number = 1; i <= 50; i++) 
{                 
p = cc.CreateData(s, "");                 
java.lang.System.out.print(p);             }             

console.info();         }     }     TDevBuildGrammar_01["__classname"] = "fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest._dev_concepts.math.rnd {     

      

      





/**
 * @author peter
 */
export class TDevRnd_01 {         

public static RunRnd_01() {             

var i : number;             
var x : number;             
var rndGen : fuzztest.utils.gen.TRndMT;             

rndGen = new fuzztest.utils.gen.TRndMT();             
console.log(rndGen);             
for(i = 0; i < 10; i++) 
{                 
x = rndGen.GetDouble();                 
console.log(x);             }         }     }     TDevRnd_01["__classname"] = "fuzztest._dev_concepts.math.rnd.TDevRnd_01";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator {     

      
      
      










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

var ret : string;             

TRepository._CreateRepository();             
ret = TRepository.gRepository._Add(b);             

return ret;         }          









/**
 * Returns the object with the given index.
 * 
 * @param   i   Index of the object requested.
 * @return      Object being requested.
 * @throws  IllegalArgumentException if the index is out of range.
 */
public static Get$int(i : number) : fuzztest.generator.VBrowseable {             

var ret : fuzztest.generator.VBrowseable;             

TRepository._CreateRepository();             
ret = TRepository.gRepository._GetElement(i);             

return ret;         }          










/**
 * Returns the object with the given key.
 * 
 * @param   key     Key of the object requested.
 * @return          Object being requested.
 * @throws  IllegalArgumentException if the key has an invalid value or
 * there isn't any object with that key.
 */
public static Get(key? : any) : any {             if(((typeof key === 'string') || key === null)) {                 return <any>(() => {                     

var ret : fuzztest.generator.VBrowseable;                     

TRepository._CreateRepository();                     
ret = TRepository.gRepository._GetElement(key);                     

return ret;                 })();             } else if(((typeof key === 'number') || key === null)) {                 return <any>fuzztest.generator.TRepository.Get$int(key);             } else throw new Error('invalid overload');         }          








/**
 * Returns a list of keys of objects that are of the same class as the given {@link VBrowseable}.
 * 
 * @param   b   The {@link VBrowseable} whose class we are querying.
 * @return      A list of keys of objects that are of the given class.
 */
public static GetKeys$fuzztest_generator_classing_TClass(c : fuzztest.generator.classing.TClass) : fuzztest.utils.store.TArrayList<string> {             

var ret : fuzztest.utils.store.TArrayList<string>;             

TRepository._CreateRepository();             
ret = TRepository.gRepository._GetKeys(c, true);             

return ret;         }          












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
public static GetKeys(c? : any, isStrict? : any) : any {             if(((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && ((typeof isStrict === 'boolean') || isStrict === null)) {                 return <any>(() => {                     

var ret : fuzztest.utils.store.TArrayList<string>;                     

TRepository._CreateRepository();                     
ret = TRepository.gRepository._GetKeys(c, isStrict);                     

return ret;                 })();             } else if(((c != null && c instanceof fuzztest.generator.classing.TClass) || c === null) && isStrict === undefined) {                 return <any>fuzztest.generator.TRepository.GetKeys$fuzztest_generator_classing_TClass(c);             } else throw new Error('invalid overload');         }          





/**
 * @return  The number of objects stored in the repository.
 */
public static GetNumElements() : number {             

var ret : number;             

TRepository._CreateRepository();             
ret = TRepository.gRepository._GetNumElements();             

return ret;         }          









/**
 * Returns <code>true</code> if there is an object with the given key, <code>false</code> otherwise.
 * 
 * @param   key     The key being queried
 * @return          <code>true</code> if there is an object with the given
 * key, <code>false</code> otherwise.
 */
public static HasElement(key : string) : boolean {             

var ret : boolean;             

TRepository._CreateRepository();             
ret = TRepository.gRepository._HasElement(key);             

return ret;         }          




/**
 * Creates a new repository (singleton) if none existed before.
 */
private static _CreateRepository() {             

if(TRepository.gRepository == null) 
{                 
TRepository.gRepository = new TRepository();             }         }          



private fRepository : fuzztest.utils.store.TArrayMap<fuzztest.generator.VBrowseable>;          

constructor() {             
;             
this.fRepository = new fuzztest.utils.store.TArrayMap<any>();         }          


private _Add(b : fuzztest.generator.VBrowseable) : string {             

var key : string;             

key = b.GetKey();             
this.fRepository.Add(key, b);             

return key;         }          


private _GetElement$int(i : number) : fuzztest.generator.VBrowseable {             

var ret : fuzztest.generator.VBrowseable;             

ret = this.fRepository.Get(i);             

return ret;         }          


public _GetElement(key? : any) : any {             if(((typeof key === 'string') || key === null)) {                 return <any>(() => {                     

var ret : fuzztest.generator.VBrowseable;                     

ret = this.fRepository.Get(key);                     

return ret;                 })();             } else if(((typeof key === 'number') || key === null)) {                 return <any>this._GetElement$int(key);             } else throw new Error('invalid overload');         }          


private _GetKeys(c : fuzztest.generator.classing.TClass, isStrict : boolean) : fuzztest.utils.store.TArrayList<string> {             

var i : number;             
var n : number;             
var b0 : fuzztest.generator.VBrowseable;             
var c0 : fuzztest.generator.classing.TClass;             
var isClass : boolean;             
var key : string;             
var ret : fuzztest.utils.store.TArrayList<string>;             

ret = new fuzztest.utils.store.TArrayList<any>();             
n = this.fRepository.GetNumElements();             
if(n >= 1) 
{                 
for(i = 0; i < n; i++) 
{                     
b0 = this.fRepository.Get(i);                     
c0 = b0.GetClass();                     
isClass = isStrict?
c.IsEqualTo(c0):

c.IsEqualToOrDerivedFrom(c0);                     
if(isClass) 
{                         
key = b0.GetKey();                         
ret.Add(key);                     }                 }             }             




return ret;         }          


private _GetNumElements() : number {             

var ret : number;             

ret = this.fRepository.GetNumElements();             

return ret;         }          


private _HasElement(key : string) : boolean {             

var ret : boolean;             

ret = this.fRepository.HasElement(key);             

return ret;         }     }     TRepository["__classname"] = "fuzztest.generator.TRepository";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator {     

      







/**
 * Browseable object, i.e. can be stored in the {@link TRepository}. Provides
 * manual and automatic key generation.
 * 
 * @author peter
 */
export abstract class VBrowseable {         










/**
 * Creates a generic {@link TClass} from this abstract class.
 * Use case: {@link TRepository} Query with abstract base class as
 * query criterion.
 * 
 * Note that each abstract sub class must override this method!
 * 
 * @return      A generic class object for this class.
 */
public static GetClassAbstract() : fuzztest.generator.classing.TClass {             

var ret : fuzztest.generator.classing.TClass;             

ret = (new VBrowseable.VBrowseableType()).GetClass().GetParent();             

return ret;         }          



static gCounter : number = -1;          

private fClass : fuzztest.generator.classing.TClass;          
private fKey : string;          




/**
 * cTor.
 */
constructor() {             
;             
this.fClass = fuzztest.generator.classing.TClass.Create(this);             
this.fKey = null;         }          


public GetClass() : fuzztest.generator.classing.TClass {             

return this.fClass;         }          





/**
 * @return      The key associated with this object.
 */
public GetKey() : string {             

return this.fKey;         }          








          












          




public _Register(key : string = null, doAutoKey : boolean = true) {             

var k : string;             

if(this.fKey != null) 
{                 
throw new java.lang.IllegalArgumentException("Key is already assigned.");             }             


if(doAutoKey) 
{                 
k = this.fClass.GetCanonicalPath();                 
VBrowseable.gCounter++;                 
this.fKey = k + "_" + VBrowseable.gCounter;             } else 


{                 
this.fKey = key;             }             


fuzztest.generator.TRepository.Add(this);         }     }     VBrowseable["__classname"] = "fuzztest.generator.VBrowseable";       export namespace VBrowseable {          export class VBrowseableType extends fuzztest.generator.VBrowseable {        }         VBrowseableType["__classname"] = "fuzztest.generator.VBrowseable.VBrowseableType";      }  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.classing {     

      





/**
 * @author peter
 */
export class TClass {         

public static kNullID : string = "anonymous";          

public static Create(obj : fuzztest.generator.VBrowseable) : TClass {             

var obj0 : Object;             
var ret : TClass;             

obj0 = <Object>(<any>obj);             
ret = new TClass(obj0);             

return ret;         }          


private fInherits : fuzztest.generator.classing.TInheritChain;          
private fName : string;          
private fInheritPath : string;          
private fCanonicalPath : string;          

constructor(obj : Object) {             
;             
var proto : Object;             
var constr : Object;             
var cls : TClass;             
var cPath : string;             

this.fCanonicalPath = TClass.kNullID;             
this.fName = TClass.kNullID;             
this.fInheritPath = TClass.kNullID;             
this.fInherits = new fuzztest.generator.classing.TInheritChain();             
proto = null;             

if(obj != null) 
{                 
proto = <Object>obj["__proto__"];                 
if(proto != null) 
{                     
constr = <Object>proto["constructor"];                     
if(constr != null) 
{                         
this.fName = <string>constr["name"];                         
this.fInherits.Add(this);                         

while((proto != null))
{                             
cls = new TClass(proto);                             
proto = <Object>proto["__proto__"];                             
if(proto != null) 
{                                 
this.fInherits.Add(cls);                             }                         };                         



this.fInheritPath = this.fInherits.GetAsString();                     }                 }             }             




proto = <Object>Object.getPrototypeOf(obj);             
if(proto != null) 
{                 
constr = <Object>proto["constructor"];                 
if(constr != null) 
{                     
cPath = <string>constr["__classname"];                     
if(cPath != null) 
{                         
this.fCanonicalPath = cPath;                     }                 }             }         }          





public GetName() : string {             

return this.fName;         }          


public GetCanonicalPath() : string {             

return this.fCanonicalPath;         }          


public GetInheritPath$() : string {             

return this.fInheritPath;         }          


public GetInheritPath(isDetailed? : any) : any {             if(((typeof isDetailed === 'boolean') || isDetailed === null)) {                 return <any>(() => {                     

var ret : string;                     

ret = this.fInherits.GetAsString(isDetailed);                     

return ret;                 })();             } else if(isDetailed === undefined) {                 return <any>this.GetInheritPath$();             } else throw new Error('invalid overload');         }          


public GetParent() : TClass {             

var nLinks : number;             
var ret : TClass;             

nLinks = this.fInherits.GetNumLinks();             
ret = null;             
if(nLinks >= 2) 
{                 
ret = this.fInherits.GetLink(1);             }             


return ret;         }          


public IsEqualTo(other : TClass) : boolean {             

var ret : boolean;             

ret = this._IsEqualTo(other);             

return ret;         }          


public IsEqualToOrDerivedFrom(other : TClass) : boolean {             

var isEq : boolean;             
var isDer : boolean;             
var ret : boolean;             

isEq = this._IsEqualTo(other);             
isDer = this.fInherits.IsLink(other);             
ret = isEq || isDer;             

return ret;         }          


private _IsEqualTo(other : TClass) : boolean {             

var ret : boolean;             

ret = (this.fCanonicalPath === other.fCanonicalPath);             

return ret;         }     }     TClass["__classname"] = "fuzztest.generator.classing.TClass";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.classing {     

      





/**
 * @author peter
 */
export class TInheritChain {         

public static kPathSeparator : string = ".";          

private fChain : fuzztest.utils.store.TArrayMap<fuzztest.generator.classing.TClass>;          

constructor() {             
;             
this.fChain = new fuzztest.utils.store.TArrayMap<any>();         }          


public GetAsString$() : string {             

var ret : string;             

ret = this._GetAsString(false);             

return ret;         }          


public GetAsString(isDetailed? : any) : any {             if(((typeof isDetailed === 'boolean') || isDetailed === null)) {                 return <any>(() => {                     

var ret : string;                     

ret = this._GetAsString(isDetailed);                     

return ret;                 })();             } else if(isDetailed === undefined) {                 return <any>this.GetAsString$();             } else throw new Error('invalid overload');         }          









/**
 * Returns the i-th parent in this inheritance chain.
 * 
 * @param   i   The number of generations above. Zero is the the referred class itself,
 * 1 (one) the first parent generation etc.
 * @return      The parent class that it i generations above the class hosting this chain.
 */
public GetLink(i : number) : fuzztest.generator.classing.TClass {             

var ret : fuzztest.generator.classing.TClass;             

ret = this.fChain.Get(i);             

return ret;         }          


public GetNumLinks() : number {             

var ret : number;             

ret = this.fChain.GetNumElements();             

return ret;         }          


public IsLink(c : fuzztest.generator.classing.TClass) : boolean {             

var i : number;             
var n : number;             
var c0 : fuzztest.generator.classing.TClass;             
var cID : string;             
var cID0 : string;             
var ret : boolean;             

ret = false;             
n = this.fChain.GetNumElements();             
if(n >= 1) 
{                 
for(i = 0; i < n; i++) 
{                     
c0 = this.fChain.Get(i);                     
cID = c.GetCanonicalPath();                     
cID0 = c0.GetCanonicalPath();                     
ret = ret || (cID === cID0);                 }             }             



return ret;         }          


Add(c : fuzztest.generator.classing.TClass) {             

var key : string;             

key = c.GetName();             
this.fChain.Add(key, c);         }          


private _GetAsString(isDetailed : boolean) : string {             

var i : number;             
var n : number;             
var c : fuzztest.generator.classing.TClass;             
var pSep : string;             
var ret : string;             

pSep = isDetailed?"\n":TInheritChain.kPathSeparator;             
ret = "";             
n = this.fChain.GetNumElements();             
if(n >= 1) 
{                 
for(i = n - 1; i >= 0; i--) 
{                     
c = this.fChain.Get(i);                     
ret += isDetailed?c.GetCanonicalPath():c.GetName();                     
if(i > 0) 
{                         
ret += pSep;                     }                 }             }             




return ret;         }     }     TInheritChain["__classname"] = "fuzztest.generator.classing.TInheritChain";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.primitive {     





/**
 * @author peter
 */
export class TOnceAssignable<T> {         

private fElement : T;          

public constructor() {             
;             
this.fElement = null;         }          


public Set(element : T) {             

if(this.fElement != null) 
{                 
throw new java.lang.IllegalArgumentException("Element can only be set once.");             }             

this.fElement = element;         }          


public Get() : T {             

if(this.fElement == null) 
{                 
throw new java.lang.IllegalStateException("Cannot retrieve unset element.");             }             


return this.fElement;         }     }     TOnceAssignable["__classname"] = "fuzztest.generator.primitive.TOnceAssignable";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule {     






/**
 * Code generation strategies.
 * 
 * @author peter
 */
export enum ERuleAdhesion {         

kFollowRule, 
kInjectInvalids, 
kFollowOpposite     } } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule {     





/**
 * @author peter
 */
export class TStrategy {         

private fRecursionCounter : number;          
private fRecursionMax : number;          
private fRuleAdhesion : fuzztest.generator.rule.ERuleAdhesion;          
private fRepeatMax : number;          

public constructor(

recursionMax : number, 
ruleAdhesion : fuzztest.generator.rule.ERuleAdhesion, 
repeatMax : number) {             

;             this.fRecursionCounter = 0;             this.fRecursionMax = 0;             this.fRepeatMax = 0;             
this._AssertParamsOK(recursionMax, ruleAdhesion, repeatMax);             
this.fRecursionMax = recursionMax;             
this.fRuleAdhesion = ruleAdhesion;             
this.fRepeatMax = repeatMax;         }          





/**
 * @return
 */
public CanEnter() : boolean {             

var ret : boolean;             

ret = (this.fRecursionCounter <= this.fRecursionMax);             

return ret;         }          


public GetRuleAdhesion() : fuzztest.generator.rule.ERuleAdhesion {             

return this.fRuleAdhesion;         }          


public GetNumRepeatsMax() : number {             

return this.fRepeatMax;         }          


public GetNumVisitsMax() : number {             

return this.fRecursionMax;         }          


private _AssertParamsOK(

recursionMax : number, 
ruleAdhesion : fuzztest.generator.rule.ERuleAdhesion, 
repeatMax : number) {             


console.info("Warning: TStrategy::_AssertParamsOK(...): Must implement.");         }     }     TStrategy["__classname"] = "fuzztest.generator.rule.TStrategy";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.cClass {     

      





/**
 * @author peter
 */
export abstract class VCharSet {         

public abstract GetChar(s : fuzztest.generator.rule.TStrategy) : string;     }     VCharSet["__classname"] = "fuzztest.generator.rule.cClass.VCharSet";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.utils.gen {     

      

      
      










/**
 * A Mersenne-Twister Random number generator.
 * 
 * TODO: When we create the random generator from the inlined source code we end up with two
 * global variables. Inlined source code needs to be refactored so that the random generator
 * object is in the scope of the hosting TRndMT instance.
 * 
 * @author peter
 */
export class TRndMT {         


public static kMT : string = 
"/*\n  I\'ve wrapped Makoto Matsumoto and Takuji Nishimura\'s code in a namespace\n  so it\'s better encapsulated. Now you can have multiple random number generators\n  and they won\'t stomp all over eachother\'s state.\n  \n  If you want to use this as a substitute for Math.random(), use the random()\n  method like so:\n  \n  var m = new MersenneTwister();\n  var randomNumber = m.random();\n  \n  You can also call the other genrand_{foo}() methods on the instance.\n\n  If you want to use a specific seed in order to get a repeatable random\n  sequence, pass an integer into the constructor:\n\n  var m = new MersenneTwister(123);\n\n  and that will always produce the same random sequence.\n\n  Sean McCullough (banksean@gmail.com)\n */\n\n/* \n A C-program for MT19937, with initialization improved 2002/1/26.\n Coded by Takuji Nishimura and Makoto Matsumoto.\n\n Before using, initialize the state by using init_genrand(seed)  \n or init_by_array(init_key, key_length).\n\n Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,\n All rights reserved.                          \n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions\n are met:\n\n 1. Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n 2. Redistributions in binary form must reproduce the above copyright\n notice, this list of conditions and the following disclaimer in the\n documentation and/or other materials provided with the distribution.\n\n 3. The names of its contributors may not be used to endorse or promote \n products derived from this software without specific prior written \n permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\n CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF\n LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING\n NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\n SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\n\n Any feedback is very welcome.\n http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html\n email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)\n */\n\nwindow.MersenneTwister = function (seed)\n{\n    if (seed == undefined)\n    {\n        seed = new Date ().getTime ();\n    }\n    /* Period parameters */\n    this.N          = 624;\n    this.M          = 397;\n    this.MATRIX_A   = 0x9908b0df;   /* constant vector a */\n    this.UPPER_MASK = 0x80000000;   /* most significant w-r bits */\n    this.LOWER_MASK = 0x7fffffff;   /* least significant r bits */\n\n    this.mt = new Array (this.N);   /* the array for the state vector */\n    this.mti = this.N + 1;          /* mti==N+1 means mt[N] is not initialized */\n\n    this.init_genrand (seed);\n}\n\n/* initializes mt[N] with a seed */\nwindow.MersenneTwister.prototype.init_genrand = function (s)\n{\n    this.mt[0] = s >>> 0;\n    for (this.mti = 1; this.mti < this.N; this.mti++)\n    {\n        var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);\n        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */\n        /* In the previous versions, MSBs of the seed affect */\n        /* only MSBs of the array mt[]. */\n        /* 2002/01/09 modified by Makoto Matsumoto */\n        this.mt[this.mti] = ( ( ( ( (s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;\n        /* for >32 bit machines */\n        this.mt[this.mti] >>>= 0;\n    }\n}\n\n/* initialize by an array with array-length */\n/* init_key is the array for initializing keys */\n/* key_length is its length */\n/* slight change for C++, 2004/2/26 */\nwindow.MersenneTwister.prototype.init_by_array = function (init_key, key_length)\n{\n    var i, j, k;\n    \n    this.init_genrand (19650218);\n    \n    i = 1;\n    j = 0;\n    k = (this.N > key_length ? this.N : key_length);\n    \n    for (; k; k--)\n    {\n        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)\n        /* non linear */\n        this.mt[i] = (this.mt[i] ^ ( ( ( ( (s & 0xffff0000) >>> 16) * 1664525) << 16) + ( (s & 0x0000ffff) * 1664525))) + init_key[j] + j;\n        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n        i++;\n        j++;\n        if (i >= this.N)\n        {\n            this.mt[0] = this.mt[this.N - 1];\n            i = 1;\n        }\n        if (j >= key_length)\n            j = 0;\n    }\n    \n    for (k = this.N - 1; k; k--)\n    {\n        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);\n        /* non linear */\n        this.mt[i] = (this.mt[i] ^ ( ( ( ( (s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i;\n        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n        i++;\n        if (i >= this.N)\n        {\n            this.mt[0] = this.mt[this.N - 1];\n            i = 1;\n        }\n    }\n\n    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */\n}\n\n/* generates a random number in range [0, 0xffffffff] */\nwindow.MersenneTwister.prototype.genrand_int32 = function ()\n{\n    var y;\n    var mag01 = new Array (0x0, this.MATRIX_A);\n    /* mag01[x] = x * MATRIX_A for x=0,1 */\n\n    if (this.mti >= this.N)\n    { /* generate N words at one time */\n        var kk;\n\n        if (this.mti == this.N + 1)     /* if init_genrand() has not been called, */\n            this.init_genrand (5489);   /* a default initial seed is used */\n\n        for (kk = 0; kk < this.N - this.M; kk++)\n        {\n            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);\n            this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];\n        }\n        for (; kk < this.N - 1; kk++)\n        {\n            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);\n            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];\n        }\n        y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);\n        this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];\n\n        this.mti = 0;\n    }\n\n    y = this.mt[this.mti++];\n\n    /* Tempering */\n    y ^= (y >>> 11);\n    y ^= (y << 7) & 0x9d2c5680;\n    y ^= (y << 15) & 0xefc60000;\n    y ^= (y >>> 18);\n\n    return y >>> 0;\n}\n\n/* These real versions are due to Isaku Wada, 2002/01/09 added */\n\nwindow.MersenneTwisterGen = new window.MersenneTwister(0);\n";          



































































































































































































static kDiv : number; public static kDiv_$LI$() : number { if(TRndMT.kDiv == null) TRndMT.kDiv = 1.0 / 4.294967296E9; return TRndMT.kDiv; };          

private fRNDGen : Object;          
private fRNDFuncInt32 : Function;          

public constructor() {             
;             
eval(TRndMT.kMT);             

this.fRNDGen = <Object>window["MersenneTwisterGen"];             
this.fRNDFuncInt32 = <Function>this.fRNDGen["genrand_int32"];         }          


public GetBoolean() : boolean {             

var x : number;             
var ret : boolean;             

x = this._GetDouble();             
ret = (x >= 0.5);             

return ret;         }          







/**
 * @param min       The possible minimum
 * @param max       The possible maximum
 * @return          An integer number in the range [min, max].
 */
public GetIntBetween(min : number, max : number) : number {             

var x : number;             
var xMax : number;             
var ret : number;             

if(min >= max) 
{                 
throw new RangeError("Constraints problem. Requirement: min < max. Given: max:" + max + ", min: " + min);             }             

xMax = max + 1;             
x = this._GetDouble();             
x = min + x * (xMax - min);             
ret = (<number>Math.round(x)|0);             

return ret;         }          





/**
 * @return  A floating point number, in the range: [0, 1[
 */
public GetDouble() : number {             

var ret : number;             

ret = this._GetDouble();             

return ret;         }          





/**
 * @return  The next random number, in the range: [0, 1[
 */
private _GetDouble() : number {             

var x : number;             
var ret : number;             

x = 0;             
while((x >= 1))
{                 
x = <number>this.fRNDFuncInt32.call(this.fRNDGen);                 
x = x * TRndMT.kDiv_$LI$();             };             


ret = x;             
return ret;         }     }     TRndMT["__classname"] = "fuzztest.utils.gen.TRndMT";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.utils.store {     

      
      









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
;             this.fNumElements = 0;             
this.fElements = new Array<any>();             
this.fNumElements = 0;         }          



public Add(obj : T) {             

this.fElements.push(obj);             
this.fNumElements++;         }          


public Get(i : number) : T {             

var ret : T;             

this._AssertIndexOK(i);             
ret = this.fElements[i];             

return ret;         }          


public GetNumElements() : number {             

return this.fNumElements;         }          


private _AssertIndexOK(i : number) {             

if(i < 0 || i >= this.fNumElements) 
{                 
throw new Error("Index out of bounds. Must be in [0, " + this.fNumElements + "[. Given: " + i);             }         }     }     TArrayList["__classname"] = "fuzztest.utils.store.TArrayList";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.utils.store {     





/**
 * @author peter
 */
export class TArrayMap<T> {         

private fHashMap : fuzztest.utils.store.THashMap<T>;          
private fArrayList : fuzztest.utils.store.TArrayList<T>;          

public constructor() {             
;             
this.fHashMap = new fuzztest.utils.store.THashMap<any>();             
this.fArrayList = new fuzztest.utils.store.TArrayList<any>();         }          


public Add(key : string, obj : T) {             

this.fHashMap.Set(key, obj);             
this.fArrayList.Add(obj);         }          


public Get(key? : any) : any {             if(((typeof key === 'string') || key === null)) {                 return <any>(() => {                     

var ret : T;                     

ret = this.fHashMap.Get(key);                     

return ret;                 })();             } else if(((typeof key === 'number') || key === null)) {                 return <any>this.Get$int(key);             } else throw new Error('invalid overload');         }          


public Get$int(i : number) : T {             

var ret : T;             

ret = this.fArrayList.Get(i);             

return ret;         }          


public GetNumElements() : number {             

var ret : number;             

ret = this.fArrayList.GetNumElements();             

return ret;         }          


public HasElement(key : string) : boolean {             

var ret : boolean;             

ret = this.fHashMap.HasElement(key);             

return ret;         }     }     TArrayMap["__classname"] = "fuzztest.utils.store.TArrayMap";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.utils.store {     








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
;             this.fNumElements = 0;             
this.fElements = <Object>new Object();             
this.fNumElements = 0;         }          



public Get(key : string) : T {             

var ret : T;             

this._AssertHasElement(key, false);             
ret = <T>this.fElements[key];             

return ret;         }          


public GetNumElements() : number {             

return this.fNumElements;         }          


public HasElement(key : string) : boolean {             

var ret : boolean;             

ret = this.fElements.hasOwnProperty(key);             

return ret;         }          


public Set(key : string, obj : T) {             

this._AssertHasElement(key, true);             
this.fElements[key] = obj;             
this.fNumElements++;         }          


private _AssertHasElement(key : string, doInverse : boolean) {             

var hasElement : boolean;             

hasElement = this.fElements.hasOwnProperty(key);             
if(doInverse) 
{                 
if(hasElement) 
{                     
throw new Error("Duplicate key: \'" + key + "\'");                 }             } else 



{                 
if(!hasElement) 
{                     
throw new Error("Unknown key: \'" + key + "\'");                 }             }         }     }     THashMap["__classname"] = "fuzztest.utils.store.THashMap";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01 {     

      

      
      







/**
 * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
 * where we (currently) don't have abstract classes.
 * 
 * @author peter
 */
export class TDevCreateObject_01 {         

public static CreateType() {             

var c : fuzztest.generator.classing.TClass;             

c = (new TDevCreateObject_01.VBrowseableType()).GetClass().GetParent();             
console.log("Inheritence chain: " + c.GetInheritPath());             
console.log("Canonical path:    " + c.GetCanonicalPath());         }     }     TDevCreateObject_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01";       export namespace TDevCreateObject_01 {          

export class VBrowseableType extends fuzztest.generator.VBrowseable {        }         VBrowseableType["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01.VBrowseableType";      }  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule {     

      
      
      
      
      
      
      





/**
 * @author peter
 */
export abstract class VNode extends fuzztest.generator.VBrowseable {         

public static ClearVisitCounters() {             

var i : number;             
var n : number;             
var k : string;             
var nd : VNode;             
var clVNode : fuzztest.generator.classing.TClass;             
var keys : fuzztest.utils.store.TArrayList<string>;             

clVNode = VNode.GetClassAbstract();             
keys = fuzztest.generator.TRepository.GetKeys(clVNode, false);             
n = keys.GetNumElements();             
if(n >= 1) 
{                 
for(i = 0; i < n; i++) 
{                     
k = keys.Get(i);                     
nd = <VNode>fuzztest.generator.TRepository.Get(k);                     
nd.ClearVisitCounter();                 }             }         }          



public static DoesFollowRule(s : fuzztest.generator.rule.TStrategy) : boolean {             

var r : fuzztest.generator.rule.ERuleAdhesion;             
var ret : boolean;             

r = s.GetRuleAdhesion();             
if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) 
{                 
ret = true;             } else 

if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowOpposite) 
{                 
ret = false;             } else 


{                 
ret = fuzztest.utils.gen.TGenData.GetBoolean();             }             


return ret;         }          





/**
 * @see         VBrowseable#GetClassAbstract()
 */
public static GetClassAbstract() : fuzztest.generator.classing.TClass {             

var ret : fuzztest.generator.classing.TClass;             

ret = (new VNode.VNodeType()).GetClass().GetParent();             

return ret;         }          



private fExpression : fuzztest.generator.primitive.TOnceAssignable<VNode>;          
private fNumVisits : number;          

          






public constructor(key? : any) {             if(((typeof key === 'string') || key === null)) {                 
super();                 this.fNumVisits = 0;                 (() => {                     
this.fNumVisits = 0;                     
this._Register(key);                 })();             } else if(key === undefined) {                 super();                 this.fNumVisits = 0;                 (() => {                     this.fNumVisits = 0;                     this.fExpression = new fuzztest.generator.primitive.TOnceAssignable<any>();                     this._Register();                 })();             } else throw new Error('invalid overload');         }          


public ClearVisitCounter() {             

this.fNumVisits = 0;         }          
















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

var nVisitsMax : number;             
var ret : string;             

nVisitsMax = s.GetNumVisitsMax();             
if(this.fNumVisits <= nVisitsMax) 
{                 
this.fNumVisits++;                 
ret = this._CreateData(s, head);             } else 


{                 
ret = head;             }             


return ret;         }          


public SetExpression(node : VNode) {             

this.fExpression.Set(node);         }          
















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

var ex : VNode;             
var ret : string;             

ex = this.fExpression.Get();             
ret = ex.CreateData(s, head);             

return ret;         }          


_GetExpression() : VNode {             

var ret : VNode;             

ret = this.fExpression.Get();             

return ret;         }          





















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

var c : fuzztest.generator.classing.TClass;             
var i : number;             
var n : number;             
var kThis : string;             
var kOther : string;             
var hasKey : boolean;             
var isEqual : boolean;             
var refs : fuzztest.utils.store.TArrayList<string>;             
var ret : VNode;             

kThis = this.GetKey();             
c = this.GetClass();             
refs = fuzztest.generator.TRepository.GetKeys(c);             
n = refs.GetNumElements();             
ret = null;             
if(n >= 1) 
{                 
hasKey = false;                 
do 
{                     
i = fuzztest.utils.gen.TGenData.GetIntUpTo(n);                     
kOther = refs.Get(i);                     
isEqual = (kThis === kOther);                     
hasKey = !isEqual;                 } while(
(!hasKey));                 

ret = <VNode>fuzztest.generator.TRepository.Get(kOther);             } else 


{                 
ret = <VNode>fuzztest.generator.TRepository.Get(kThis);             }             


return ret;         }     }     VNode["__classname"] = "fuzztest.generator.rule.VNode";       export namespace VNode {          export class VNodeType extends fuzztest.generator.rule.VNode {        }         VNodeType["__classname"] = "fuzztest.generator.rule.VNode.VNodeType";      }  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.cClass {     

      
      
      





/**
 * @author peter
 */export class TCharacterPoint extends 
fuzztest.generator.rule.cClass.VCharSet {         

private fChar : string;          

public constructor(ch : string) {             
super();             this.fChar = null;             
this._AssertOK(ch);             
this.fChar = ch.charAt(0);         }          






public GetChar(s : fuzztest.generator.rule.TStrategy) : string {             

var doFollow : boolean;             
var doHead : boolean;             
var loChar : string;             
var hiChar : string;             
var ret : string;             

doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);             
if(doFollow) 
{                 
ret = this.fChar;             } else 


{                 
if(this.fChar === '\u0000') 
{                     
loChar = '\u0001';                     
hiChar = '\uffff';                     
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);                 } else 

if(this.fChar === '\uffff') 
{                     
loChar = '\u0000';                     
hiChar = '\ufffe';                     
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);                 } else 


{                     
doHead = fuzztest.utils.gen.TGenData.GetBoolean();                     
if(doHead) 
{                         
loChar = '\u0000';                         
hiChar = String.fromCharCode(((this.fChar).charCodeAt(0) - 1));                         
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);                     } else 


{                         
loChar = String.fromCharCode(((this.fChar).charCodeAt(0) + 1));                         
hiChar = <string>('\uffff');                         
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);                     }                 }             }             




return ret;         }          





/**
 * @param ch
 */
private _AssertOK(ch : string) {             

var l : number;             

l = ch.length;             
if(l !== 1) 
{                 
throw new java.lang.IllegalArgumentException("For ch: Use string of length 1 (single character string).");             }         }     }     TCharacterPoint["__classname"] = "fuzztest.generator.rule.cClass.TCharacterPoint";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.cClass {     

      
      
      





/**
 * @author peter
 */export class TCharacterRange extends 
fuzztest.generator.rule.cClass.VCharSet {         

private fHiChar : string;          
private fLoChar : string;          

public constructor(loChar : string, hiChar : string) {             
super();             this.fHiChar = null;             this.fLoChar = null;             
this._AssertOk(loChar, hiChar);             
this.fLoChar = loChar.charAt(0);             
this.fHiChar = hiChar.charAt(0);         }          






public GetChar(s : fuzztest.generator.rule.TStrategy) : string {             

var doFollow : boolean;             
var doHead : boolean;             
var loChar : string;             
var hiChar : string;             
var ret : string;             

doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);             
if(doFollow) 
{                 
ret = fuzztest.utils.gen.TGenData.GetChar(this.fLoChar, this.fHiChar);             } else 


{                 
if(this.fLoChar === '\u0000' && this.fHiChar === '\uffff') 
{                     

ret = fuzztest.utils.gen.TGenData.GetChar();                 } else 

if(this.fLoChar === '\u0000') 
{                     
loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));                     
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');                 } else 

if(this.fHiChar === '\uffff') 
{                     
hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));                     
ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);                 } else 


{                     
doHead = fuzztest.utils.gen.TGenData.GetBoolean();                     
if(doHead) 
{                         
hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));                         
ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);                     } else 


{                         
loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));                         
ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');                     }                 }             }             





return ret;         }          






/**
 * @param loChar
 * @param hiChar
 */
private _AssertOk(loChar : string, hiChar : string) {             

var l1 : number;             
var l2 : number;             
var order : number;             

l1 = loChar.length;             
l2 = hiChar.length;             
order = /* compareTo */hiChar.localeCompare(loChar);             

if(l1 !== 1) 
{                 
throw new java.lang.IllegalArgumentException("For loChar: Use string of length 1 (single character string).");             }             

if(l2 !== 1) 
{                 
throw new java.lang.IllegalArgumentException("For hiChar: Use string of length 1 (single character string).");             }             

if(order <= 0) 
{                 
throw new java.lang.IllegalArgumentException("loChar must lexically precede hiChar.");             }         }     }     TCharacterRange["__classname"] = "fuzztest.generator.rule.cClass.TCharacterRange";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.utils.gen {     

      





/**
 * @author peter
 */
export class TGenData {         

static gRndGen : fuzztest.utils.gen.TRndMT; public static gRndGen_$LI$() : fuzztest.utils.gen.TRndMT { if(TGenData.gRndGen == null) TGenData.gRndGen = new fuzztest.utils.gen.TRndMT(); return TGenData.gRndGen; };          




/**
 * @return      A random boolean.
 */
public static GetBoolean() : boolean {             

var ret : boolean;             

ret = TGenData.gRndGen_$LI$().GetBoolean();             

return ret;         }          





/**
 * @return      A random character within the full unicode range, [0, 65535].
 */
public static GetChar$() : string {             

var ret : string;             

ret = String.fromCharCode(TGenData._GetIntBetween('\u0000', '\uffff'));             

return ret;         }          







/**
 * @param   loChar    The lowest possible character.
 * @param   hiChar    The highest possible character.
 * @return            A random character in the range [loChar, hiChar].
 */
public static GetChar(loChar? : any, hiChar? : any) : any {             if(((typeof loChar === 'string') || loChar === null) && ((typeof hiChar === 'string') || hiChar === null)) {                 return <any>(() => {                     

var ret : string;                     

if((loChar).charCodeAt(0) < ('\u0000').charCodeAt(0) || (loChar).charCodeAt(0) > ('\uffff').charCodeAt(0)) 
{                         
throw new RangeError("Constraints problem: Lower boundery must be in [u0000, uFFFF]. Given: " + (1 * (loChar).charCodeAt(0)));                     } else 

if((hiChar).charCodeAt(0) < ('\u0000').charCodeAt(0) || (hiChar).charCodeAt(0) > ('\uffff').charCodeAt(0)) 
{                         
throw new RangeError("Constraints problem: Upper boundery must be in [u0000, uFFFF]. Given: " + (1 * (hiChar).charCodeAt(0)));                     } else 

if((loChar).charCodeAt(0) >= (hiChar).charCodeAt(0)) 
{                         
throw new RangeError("Constraints problem: Required: loChar < hiChar. Given: loChar: " + (1 * (loChar).charCodeAt(0)) + ", hiChar: " + (1 * (hiChar).charCodeAt(0)));                     }                     


ret = String.fromCharCode(TGenData._GetIntBetween(loChar, hiChar));                     

return ret;                 })();             } else if(loChar === undefined && hiChar === undefined) {                 return <any>fuzztest.utils.gen.TGenData.GetChar$();             } else throw new Error('invalid overload');         }          









/**
 * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
 * Convenience method, useful for creating random array indices.
 * 
 * @param       max     Possible maximum less one.
 * @return              Random integer in range [0, maxN[
 */
public static GetIntUpTo(max : number) : number {             

var xMax : number;             
var ret : number;             

xMax = max - 1;             
ret = TGenData._GetIntBetween(0, xMax);             

return ret;         }          









/**
 * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
 * 
 * @param       min     Possible minimum.
 * @param       max     Possible maximum.
 * @return              Random value in range [min, max].
 */
public static GetIntBetween(min : number, max : number) : number {             

var ret : number;             

ret = TGenData._GetIntBetween(min, max);             

return ret;         }          









/**
 * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
 * 
 * @param       min     Possible minimum.
 * @param       max     Possible maximum.
 * @return              Random value in range [min, max].
 */
private static _GetIntBetween(min : number, max : number) : number {             

var ret : number;             

ret = TGenData.gRndGen_$LI$().GetIntBetween(min, max);             

return ret;         }     }     TGenData["__classname"] = "fuzztest.utils.gen.TGenData";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01 {     

      

      
      
      







/**
 * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
 * where we (currently) don't have abstract classes.
 * 
 * @author peter
 */
export class TDevCreateObject_02 {         

public static CreateType() {             

var c : fuzztest.generator.classing.TClass;             

console.clear();             
console.log("Legend: x\'  means \"a type derived from x\" (as in calculus).");             
console.log("      : x\'^ means \"a parent of a type derived from x\" (i.e. x).");             
console.log();             
c = fuzztest.generator.VBrowseable.GetClassAbstract();             
console.log("VBrowseable       => Inheritence chain: " + c.GetInheritPath());             
console.log("VBrowseable       => Canonical path:    " + c.GetCanonicalPath());             

c = fuzztest.generator.rule.VNode.GetClassAbstract();             
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
console.log("VBrowseable\'\'^    => Canonical path:    " + c.GetCanonicalPath());         }     }     TDevCreateObject_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02";       export namespace TDevCreateObject_02 {          

export class VDeriv_01 extends fuzztest.generator.VBrowseable {        }         VDeriv_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_01";           
export class VDeriv_02 extends fuzztest.generator.rule.VNode {        }         VDeriv_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_02";      }  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.action {     

      





























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
export class TAction extends fuzztest.generator.rule.VNode {    }     TAction["__classname"] = "fuzztest.generator.rule.action.TAction";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.any {     

      
      
      




















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

var ret : string;             


ret = head + fuzztest.utils.gen.TGenData.GetChar();             

return ret;         }     }     TAny["__classname"] = "fuzztest.generator.rule.any.TAny";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.cClass {     

      

      
      
      
      































































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

private fSets : fuzztest.utils.store.TArrayList<fuzztest.generator.rule.cClass.VCharSet>;          




/**
 * cTor.
 */
public constructor() {             

super();             
this.fSets = new fuzztest.utils.store.TArrayList<any>();         }          


public AddPoint(ch : string) {             

var set : fuzztest.generator.rule.cClass.TCharacterPoint;             

set = new fuzztest.generator.rule.cClass.TCharacterPoint(ch);             
this.fSets.Add(set);         }          






/**
 * @param string
 * @param string2
 */
public AddRange(loChar : string, hiChar : string) {             

var set : fuzztest.generator.rule.cClass.TCharacterRange;             

set = new fuzztest.generator.rule.cClass.TCharacterRange(loChar, hiChar);             
this.fSets.Add(set);         }          


_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var n : number;             
var cs : fuzztest.generator.rule.cClass.VCharSet;             
var x : number;             
var ret : string;             

n = this.fSets.GetNumElements();             
if(n >= 1) 
{                 
x = fuzztest.utils.gen.TGenData.GetIntUpTo(n);                 
cs = this.fSets.Get(x);                 
ret = head + cs.GetChar(s);             } else 


{                 
ret = head;             }             


return ret;         }     }     TCharacterClass["__classname"] = "fuzztest.generator.rule.cClass.TCharacterClass";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.choice {     

      

      
      
      










































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
this.fBranches = new java.util.ArrayList<any>();         }          


public AddExpression(node : fuzztest.generator.rule.VNode) {             

this.fBranches.add(node);         }          






_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var i : number;             
var n : number;             
var node : fuzztest.generator.rule.VNode;             
var ret : string;             

n = this.fBranches.size();             
if(n >= 1) 
{                 
i = fuzztest.utils.gen.TGenData.GetIntUpTo(n);                 
node = this.fBranches.get(i);                 
ret = node.CreateData(s, head);             } else 


{                 
ret = head;             }             


return ret;         }     }     TChoice["__classname"] = "fuzztest.generator.rule.choice.TChoice";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.expression {     

      









/**
 * Corresponding PEGjs rule:
 * <pre>
 * Expression
 * = ChoiceExpression
 * </pre>
 * @author peter
 */
export class TExpression extends fuzztest.generator.rule.VNode {    }     TExpression["__classname"] = "fuzztest.generator.rule.expression.TExpression";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.grammar {     

      
      
      
      








































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

var rStart : fuzztest.generator.rule.rule.TRule;             
var ret : string;             

rStart = <fuzztest.generator.rule.rule.TRule>fuzztest.generator.TRepository.Get(TGrammar.kKeyStart);             
ret = rStart.CreateData(s, head);             

return ret;         }     }     TGrammar["__classname"] = "fuzztest.generator.rule.grammar.TGrammar";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.group {     

      







































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
export class TGroup extends fuzztest.generator.rule.VNode {    }     TGroup["__classname"] = "fuzztest.generator.rule.group.TGroup";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.initializer {     

      


















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
export class TInitializer extends fuzztest.generator.rule.VNode {    }     TInitializer["__classname"] = "fuzztest.generator.rule.initializer.TInitializer";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.labelled {     

      
      
      
      
      























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
this.fLabel = new fuzztest.generator.primitive.TOnceAssignable<any>();         }          


public GetLabel() : string {             

var ret : string;             

ret = this.fLabel.Get();             

return ret;         }          


public SetLabel(label : string) {             

this.fLabel.Set(label);         }     }     TLabelled["__classname"] = "fuzztest.generator.rule.labelled.TLabelled";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.literal {     

      
      























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
this.fLiteral = literal;         }          






_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var doFollow : boolean;             
var lit : TLiteral;             
var ret : string;             

doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);             
if(doFollow) 
{                 
lit = this;             } else 


{                 
lit = <TLiteral>this._GetFromOppositeSet();             }             


ret = head + lit.fLiteral;             

return ret;         }     }     TLiteral["__classname"] = "fuzztest.generator.rule.literal.TLiteral";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.named {     

      
      
      








































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
this.fName = new fuzztest.generator.primitive.TOnceAssignable<any>();         }          


public GetName() : string {             

var ret : string;             

ret = this.fName.Get();             

return ret;         }          


public SetName(name : string) {             

this.fName.Set(name);         }     }     TNamed["__classname"] = "fuzztest.generator.rule.named.TNamed";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.prefixed.simple_and {     

      






























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
export class TSimpleAnd extends fuzztest.generator.rule.VNode {    }     TSimpleAnd["__classname"] = "fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.prefixed.simple_not {     

      
      
      






























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
export class TSimpleNot extends fuzztest.generator.rule.VNode {    }     TSimpleNot["__classname"] = "fuzztest.generator.rule.prefixed.simple_not.TSimpleNot";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.prefixed.text {     

      
      
      
































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
export class TText extends fuzztest.generator.rule.VNode {    }     TText["__classname"] = "fuzztest.generator.rule.prefixed.text.TText";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.rule {     

      
      
      
      








































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

super(key);         }          






_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var doFollow : boolean;             
var ref : TRule;             
var expr : fuzztest.generator.rule.VNode;             
var ret : string;             

doFollow = fuzztest.generator.rule.VNode.DoesFollowRule(s);             
if(doFollow) 
{                 
ref = this;             } else 


{                 
ref = <TRule>this._GetFromOppositeSet();             }             


expr = ref._GetExpression();             
ret = expr.CreateData(s, head);             

return ret;         }     }     TRule["__classname"] = "fuzztest.generator.rule.rule.TRule";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.rule_ref {     

      




















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
export class TReference extends fuzztest.generator.rule.VNode {    }     TReference["__classname"] = "fuzztest.generator.rule.rule_ref.TReference";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.semanticPredicate.semantic_and {     

      





































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
export class TSemanticAnd extends fuzztest.generator.rule.VNode {    }     TSemanticAnd["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.semanticPredicate.semantic_not {     

      
      





































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
export class TSemanticNot extends fuzztest.generator.rule.VNode {    }     TSemanticNot["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.sequence {     

      

      
      










































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
this.fElements = new java.util.ArrayList<any>();         }          


public Add(element : fuzztest.generator.rule.VNode) {             

this.fElements.add(element);         }          






_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var i : number;             
var n : number;             
var e : fuzztest.generator.rule.VNode;             
var ret : string;             

ret = head;             
n = this.fElements.size();             
if(n >= 1) 
{                 
for(i = 0; i < n; i++) 
{                     
e = this.fElements.get(i);                     
ret = ret + e.CreateData(s, "");                 }             }             



return ret;         }     }     TSequence["__classname"] = "fuzztest.generator.rule.sequence.TSequence";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.suffixed {     

      
      
      
      
      
      





/**
 * @author peter
 */
export abstract class VSuffixed extends fuzztest.generator.rule.VNode {         




/**
 * @see         VBrowseable#GetClassAbstract()
 */
public static GetClassAbstract() : fuzztest.generator.classing.TClass {             

var ret : fuzztest.generator.classing.TClass;             

ret = (new VSuffixed.VSuffixedType()).GetClass().GetParent();             

return ret;         }          



private fIsNMinZero : boolean;          
private fIsNMaxInfinite : boolean;          

public constructor(isNMinZero : boolean, isNMaxInfinite : boolean) {             
super();             this.fIsNMinZero = false;             this.fIsNMaxInfinite = false;             
this.fIsNMinZero = isNMinZero;             
this.fIsNMaxInfinite = isNMaxInfinite;         }          






_CreateData(s : fuzztest.generator.rule.TStrategy, head : string) : string {             

var r : fuzztest.generator.rule.ERuleAdhesion;             
var ex : fuzztest.generator.rule.VNode;             
var doBreakRule : boolean;             
var nMin : number;             
var nMax : number;             
var n : number;             
var i : number;             
var ret : string;             

doBreakRule = true;             
r = s.GetRuleAdhesion();             
if(r === fuzztest.generator.rule.ERuleAdhesion.kFollowRule) 
{                 
doBreakRule = false;             } else 


{                 
doBreakRule = fuzztest.utils.gen.TGenData.GetBoolean();             }             


n = 0;             
if(doBreakRule) 
{                 
nMin = 0;                 
nMax = 0;                 
if(this.fIsNMinZero && !this.fIsNMaxInfinite) 
{                     
nMax = 1;                 } else 

if(!this.fIsNMinZero && this.fIsNMaxInfinite) 
{                     
nMax = 0;                 } else 

if(this.fIsNMinZero && this.fIsNMaxInfinite) 
{                     
nMax = s.GetNumRepeatsMax();                 }                 


if(nMax >= 1) 
{                     
n = fuzztest.utils.gen.TGenData.GetIntBetween(nMin, nMax);                 }             } else 



{                 
nMin = this.fIsNMinZero?0:1;                 
nMax = this.fIsNMaxInfinite?s.GetNumRepeatsMax():1;                 
n = fuzztest.utils.gen.TGenData.GetIntBetween(nMin, nMax);             }             


ret = head;             
if(n >= 1) 
{                 
ex = this._GetExpression();                 
for(i = 1; i <= n; i++) 
{                     
ret = ret + ex.CreateData(s, "");                 }             }             



return ret;         }     }     VSuffixed["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed";       export namespace VSuffixed {          export class VSuffixedType extends fuzztest.generator.rule.suffixed.VSuffixed {             public constructor() {                 super(false, false);             }         }         VSuffixedType["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed.VSuffixedType";      }  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.suffixed.one_or_more {     

      
      
      
























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

super(false, true);         }     }     TOneOrMore["__classname"] = "fuzztest.generator.rule.suffixed.one_or_more.TOneOrMore";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.suffixed.optional {     

      
      
      
      






























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

super(true, false);         }     }     TOptional["__classname"] = "fuzztest.generator.rule.suffixed.optional.TOptional";  } 














/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */ namespace fuzztest.generator.rule.suffixed.zero_or_more {     

      
      
      






























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

super(true, true);         }     }     TZeroOrMore["__classname"] = "fuzztest.generator.rule.suffixed.zero_or_more.TZeroOrMore";  } 

fuzztest.utils.gen.TGenData.gRndGen_$LI$();

fuzztest.utils.gen.TRndMT.kDiv_$LI$();

fuzztest.TMain.main(null);
