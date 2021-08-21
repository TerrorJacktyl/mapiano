/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* start := chord
* tone := 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
* note := tone=tone sharp='#'?
* root := note
* major := symbol={'M' | 'maj' | ''}
* minor := symbol={'min' | 'm'}
* diminished := symbol={ 'o' | 'dim' }
* augmented := symbol={'\+' | 'aug'}
* quality := minor | diminished | augmented　| major
* chord := root=root quality=quality $
*/
type Nullable<T> = T | null;
type $$RuleType<T> = () => Nullable<T>;
interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    start = "start",
    tone_1 = "tone_1",
    tone_2 = "tone_2",
    tone_3 = "tone_3",
    tone_4 = "tone_4",
    tone_5 = "tone_5",
    tone_6 = "tone_6",
    tone_7 = "tone_7",
    note = "note",
    root = "root",
    major = "major",
    major_$0_1 = "major_$0_1",
    major_$0_2 = "major_$0_2",
    major_$0_3 = "major_$0_3",
    minor = "minor",
    minor_$0_1 = "minor_$0_1",
    minor_$0_2 = "minor_$0_2",
    diminished = "diminished",
    diminished_$0_1 = "diminished_$0_1",
    diminished_$0_2 = "diminished_$0_2",
    augmented = "augmented",
    augmented_$0_1 = "augmented_$0_1",
    augmented_$0_2 = "augmented_$0_2",
    quality_1 = "quality_1",
    quality_2 = "quality_2",
    quality_3 = "quality_3",
    quality_4 = "quality_4",
    chord = "chord",
    $EOF = "$EOF",
}
export type start = chord;
export type tone = tone_1 | tone_2 | tone_3 | tone_4 | tone_5 | tone_6 | tone_7;
export type tone_1 = string;
export type tone_2 = string;
export type tone_3 = string;
export type tone_4 = string;
export type tone_5 = string;
export type tone_6 = string;
export type tone_7 = string;
export interface note {
    kind: ASTKinds.note;
    tone: tone;
    sharp: Nullable<string>;
}
export type root = note;
export interface major {
    kind: ASTKinds.major;
    symbol: major_$0;
}
export type major_$0 = major_$0_1 | major_$0_2 | major_$0_3;
export type major_$0_1 = string;
export type major_$0_2 = string;
export type major_$0_3 = string;
export interface minor {
    kind: ASTKinds.minor;
    symbol: minor_$0;
}
export type minor_$0 = minor_$0_1 | minor_$0_2;
export type minor_$0_1 = string;
export type minor_$0_2 = string;
export interface diminished {
    kind: ASTKinds.diminished;
    symbol: diminished_$0;
}
export type diminished_$0 = diminished_$0_1 | diminished_$0_2;
export type diminished_$0_1 = string;
export type diminished_$0_2 = string;
export interface augmented {
    kind: ASTKinds.augmented;
    symbol: augmented_$0;
}
export type augmented_$0 = augmented_$0_1 | augmented_$0_2;
export type augmented_$0_1 = string;
export type augmented_$0_2 = string;
export type quality = quality_1 | quality_2 | quality_3 | quality_4;
export type quality_1 = minor;
export type quality_2 = diminished;
export type quality_3 = augmented;
export type quality_4 = major;
export interface chord {
    kind: ASTKinds.chord;
    root: root;
    quality: quality;
}
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    private memoSafe: boolean = true;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public clearMemos(): void {
    }
    public matchstart($$dpth: number, $$cr?: ErrorTracker): Nullable<start> {
        return this.matchchord($$dpth + 1, $$cr);
    }
    public matchtone($$dpth: number, $$cr?: ErrorTracker): Nullable<tone> {
        return this.choice<tone>([
            () => this.matchtone_1($$dpth + 1, $$cr),
            () => this.matchtone_2($$dpth + 1, $$cr),
            () => this.matchtone_3($$dpth + 1, $$cr),
            () => this.matchtone_4($$dpth + 1, $$cr),
            () => this.matchtone_5($$dpth + 1, $$cr),
            () => this.matchtone_6($$dpth + 1, $$cr),
            () => this.matchtone_7($$dpth + 1, $$cr),
        ]);
    }
    public matchtone_1($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_1> {
        return this.regexAccept(String.raw`(?:A)`, $$dpth + 1, $$cr);
    }
    public matchtone_2($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_2> {
        return this.regexAccept(String.raw`(?:B)`, $$dpth + 1, $$cr);
    }
    public matchtone_3($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_3> {
        return this.regexAccept(String.raw`(?:C)`, $$dpth + 1, $$cr);
    }
    public matchtone_4($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_4> {
        return this.regexAccept(String.raw`(?:D)`, $$dpth + 1, $$cr);
    }
    public matchtone_5($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_5> {
        return this.regexAccept(String.raw`(?:E)`, $$dpth + 1, $$cr);
    }
    public matchtone_6($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_6> {
        return this.regexAccept(String.raw`(?:F)`, $$dpth + 1, $$cr);
    }
    public matchtone_7($$dpth: number, $$cr?: ErrorTracker): Nullable<tone_7> {
        return this.regexAccept(String.raw`(?:G)`, $$dpth + 1, $$cr);
    }
    public matchnote($$dpth: number, $$cr?: ErrorTracker): Nullable<note> {
        return this.run<note>($$dpth,
            () => {
                let $scope$tone: Nullable<tone>;
                let $scope$sharp: Nullable<Nullable<string>>;
                let $$res: Nullable<note> = null;
                if (true
                    && ($scope$tone = this.matchtone($$dpth + 1, $$cr)) !== null
                    && (($scope$sharp = this.regexAccept(String.raw`(?:#)`, $$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.note, tone: $scope$tone, sharp: $scope$sharp};
                }
                return $$res;
            });
    }
    public matchroot($$dpth: number, $$cr?: ErrorTracker): Nullable<root> {
        return this.matchnote($$dpth + 1, $$cr);
    }
    public matchmajor($$dpth: number, $$cr?: ErrorTracker): Nullable<major> {
        return this.run<major>($$dpth,
            () => {
                let $scope$symbol: Nullable<major_$0>;
                let $$res: Nullable<major> = null;
                if (true
                    && ($scope$symbol = this.matchmajor_$0($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.major, symbol: $scope$symbol};
                }
                return $$res;
            });
    }
    public matchmajor_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<major_$0> {
        return this.choice<major_$0>([
            () => this.matchmajor_$0_1($$dpth + 1, $$cr),
            () => this.matchmajor_$0_2($$dpth + 1, $$cr),
            () => this.matchmajor_$0_3($$dpth + 1, $$cr),
        ]);
    }
    public matchmajor_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<major_$0_1> {
        return this.regexAccept(String.raw`(?:M)`, $$dpth + 1, $$cr);
    }
    public matchmajor_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<major_$0_2> {
        return this.regexAccept(String.raw`(?:maj)`, $$dpth + 1, $$cr);
    }
    public matchmajor_$0_3($$dpth: number, $$cr?: ErrorTracker): Nullable<major_$0_3> {
        return this.regexAccept(String.raw`(?:)`, $$dpth + 1, $$cr);
    }
    public matchminor($$dpth: number, $$cr?: ErrorTracker): Nullable<minor> {
        return this.run<minor>($$dpth,
            () => {
                let $scope$symbol: Nullable<minor_$0>;
                let $$res: Nullable<minor> = null;
                if (true
                    && ($scope$symbol = this.matchminor_$0($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.minor, symbol: $scope$symbol};
                }
                return $$res;
            });
    }
    public matchminor_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<minor_$0> {
        return this.choice<minor_$0>([
            () => this.matchminor_$0_1($$dpth + 1, $$cr),
            () => this.matchminor_$0_2($$dpth + 1, $$cr),
        ]);
    }
    public matchminor_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<minor_$0_1> {
        return this.regexAccept(String.raw`(?:min)`, $$dpth + 1, $$cr);
    }
    public matchminor_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<minor_$0_2> {
        return this.regexAccept(String.raw`(?:m)`, $$dpth + 1, $$cr);
    }
    public matchdiminished($$dpth: number, $$cr?: ErrorTracker): Nullable<diminished> {
        return this.run<diminished>($$dpth,
            () => {
                let $scope$symbol: Nullable<diminished_$0>;
                let $$res: Nullable<diminished> = null;
                if (true
                    && ($scope$symbol = this.matchdiminished_$0($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.diminished, symbol: $scope$symbol};
                }
                return $$res;
            });
    }
    public matchdiminished_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<diminished_$0> {
        return this.choice<diminished_$0>([
            () => this.matchdiminished_$0_1($$dpth + 1, $$cr),
            () => this.matchdiminished_$0_2($$dpth + 1, $$cr),
        ]);
    }
    public matchdiminished_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<diminished_$0_1> {
        return this.regexAccept(String.raw`(?:o)`, $$dpth + 1, $$cr);
    }
    public matchdiminished_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<diminished_$0_2> {
        return this.regexAccept(String.raw`(?:dim)`, $$dpth + 1, $$cr);
    }
    public matchaugmented($$dpth: number, $$cr?: ErrorTracker): Nullable<augmented> {
        return this.run<augmented>($$dpth,
            () => {
                let $scope$symbol: Nullable<augmented_$0>;
                let $$res: Nullable<augmented> = null;
                if (true
                    && ($scope$symbol = this.matchaugmented_$0($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.augmented, symbol: $scope$symbol};
                }
                return $$res;
            });
    }
    public matchaugmented_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<augmented_$0> {
        return this.choice<augmented_$0>([
            () => this.matchaugmented_$0_1($$dpth + 1, $$cr),
            () => this.matchaugmented_$0_2($$dpth + 1, $$cr),
        ]);
    }
    public matchaugmented_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<augmented_$0_1> {
        return this.regexAccept(String.raw`(?:\+)`, $$dpth + 1, $$cr);
    }
    public matchaugmented_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<augmented_$0_2> {
        return this.regexAccept(String.raw`(?:aug)`, $$dpth + 1, $$cr);
    }
    public matchquality($$dpth: number, $$cr?: ErrorTracker): Nullable<quality> {
        return this.choice<quality>([
            () => this.matchquality_1($$dpth + 1, $$cr),
            () => this.matchquality_2($$dpth + 1, $$cr),
            () => this.matchquality_3($$dpth + 1, $$cr),
            () => this.matchquality_4($$dpth + 1, $$cr),
        ]);
    }
    public matchquality_1($$dpth: number, $$cr?: ErrorTracker): Nullable<quality_1> {
        return this.matchminor($$dpth + 1, $$cr);
    }
    public matchquality_2($$dpth: number, $$cr?: ErrorTracker): Nullable<quality_2> {
        return this.matchdiminished($$dpth + 1, $$cr);
    }
    public matchquality_3($$dpth: number, $$cr?: ErrorTracker): Nullable<quality_3> {
        return this.matchaugmented($$dpth + 1, $$cr);
    }
    public matchquality_4($$dpth: number, $$cr?: ErrorTracker): Nullable<quality_4> {
        return this.matchmajor($$dpth + 1, $$cr);
    }
    public matchchord($$dpth: number, $$cr?: ErrorTracker): Nullable<chord> {
        return this.run<chord>($$dpth,
            () => {
                let $scope$root: Nullable<root>;
                let $scope$quality: Nullable<quality>;
                let $$res: Nullable<chord> = null;
                if (true
                    && ($scope$root = this.matchroot($$dpth + 1, $$cr)) !== null
                    && ($scope$quality = this.matchquality($$dpth + 1, $$cr)) !== null
                    && this.match$EOF($$cr) !== null
                ) {
                    $$res = {kind: ASTKinds.chord, root: $scope$root, quality: $scope$quality};
                }
                return $$res;
            });
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchstart(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchstart(0);
        if (res)
            return {ast: res, errs: []};
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchstart(0, rec);
        const err = rec.getErr()
        return {ast: res, errs: err !== null ? [err] : []}
    }
    public mark(): PosInfo {
        return this.pos;
    }
    private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private run<T>($$dpth: number, fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn()
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, dpth: number, cr?: ErrorTracker): Nullable<string> {
        return this.run<string>(dpth,
            () => {
                const reg = new RegExp(match, "y");
                const mrk = this.mark();
                reg.lastIndex = mrk.overallPos;
                const res = this.tryConsume(reg);
                if(cr) {
                    cr.record(mrk, res, {
                        kind: "RegexMatch",
                        // We substring from 3 to len - 1 to strip off the
                        // non-capture group syntax added as a WebKit workaround
                        literal: match.substring(3, match.length - 1),
                        negated: this.negating,
                    });
                }
                return res;
            });
    }
    private tryConsume(reg: RegExp): Nullable<string> {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    private memoise<K>(rule: $$RuleType<K>, memo: Map<number, [Nullable<K>, PosInfo]>): Nullable<K> {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if(this.memoSafe && $scope$memoRes !== undefined) {
        this.reset($scope$memoRes[1]);
        return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if(this.memoSafe)
        memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
    private match$EOF(et?: ErrorTracker): Nullable<{kind: ASTKinds.$EOF}> {
        const res: {kind: ASTKinds.$EOF} | null = this.finished() ? { kind: ASTKinds.$EOF } : null;
        if(et)
            et.record(this.mark(), res, { kind: "EOF", negated: this.negating });
        return res;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export interface ParseResult {
    ast: Nullable<start>;
    errs: SyntaxErr[];
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export interface RegexMatch {
    readonly kind: "RegexMatch";
    readonly negated: boolean;
    readonly literal: string;
}
export type EOFMatch = { kind: "EOF"; negated: boolean };
export type MatchAttempt = RegexMatch | EOFMatch;
export class SyntaxErr {
    public pos: PosInfo;
    public expmatches: MatchAttempt[];
    constructor(pos: PosInfo, expmatches: MatchAttempt[]) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ': ''}'${x.literal}'`)}`;
    }
}
class ErrorTracker {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private regexset: Set<string> = new Set();
    private pmatches: MatchAttempt[] = [];
    public record(pos: PosInfo, result: any, att: MatchAttempt) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear()
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if(att.kind === "RegexMatch") {
                if(!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            } else {
                this.pmatches.push(att);
            }
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}