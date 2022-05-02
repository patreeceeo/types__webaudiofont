declare class WebAudioFontChannel {
    audioContext: AudioContext;
    input: GainNode;
    band32: BiquadFilterNode;
    band64: BiquadFilterNode;
    band128: BiquadFilterNode;
    band256: BiquadFilterNode;
    band512: BiquadFilterNode;
    band1k: BiquadFilterNode;
    band2k: BiquadFilterNode;
    band4k: BiquadFilterNode;
    band8k: BiquadFilterNode;
    band16k: BiquadFilterNode;
    output: GainNode;
    constructor(audioContext: AudioContext);
    bandEqualizer(from: AudioNode, frequency: number): BiquadFilterNode;
}

declare class WebAudioFontLoader {
    cached: CachedPreset[];
    player: WebAudioFontPlayer;
    instrumentKeyArray: string[];
    instrumentNamesArray: string[];
    choosenInfos: NumPair[];
    drumNamesArray: string[];
    drumKeyArray: string[];
    constructor(player: WebAudioFontPlayer);
    startLoad(audioContext: AudioContext, filePath: string, variableName: string): void;
    decodeAfterLoading(audioContext: AudioContext, variableName: string): void;
    waitOrFinish(variableName: string, onFinish: () => void): void;
    loaded(variableName: string): boolean;
    progress(): number;
    waitLoad(onFinish: () => void): void;
    instrumentTitles: () => string[];
    instrumentKeys(): string[];
    instrumentInfo(n: number): PresetInfo;
    findInstrument(program: number): number;
    drumTitles(): string[];
    drumKeys(): string[];
    drumInfo(n: number): PresetInfo;
    findDrum(nn: number): number;
}

declare type WaveEnvelope = {
    audioBufferSourceNode?: AudioBufferSourceNode | null;
    target: AudioNode;
    when: number;
    duration: number;
    cancel: () => void;
    pitch: number;
    preset: WavePreset;
};
declare type WaveZone = {
    keyRangeLow: number;
    keyRangeHigh: number;
    originalPitch: number;
    coarseTune: number;
    fineTune: number;
    loopStart: number;
    loopEnd: number;
    buffer?: AudioBuffer;
    sampleRate: number;
    delay?: number;
    ahdsr?: boolean | WaveAHDSR[];
    sample?: string;
    file?: string;
    sustain?: number;
};
declare type WavePreset = {
    zones: WaveZone[];
};
declare type WaveSlide = {
    when: number;
    pitch: number;
};
declare type WaveAHDSR = {
    duration: number;
    volume: number;
};
declare type CachedPreset = {
    variableName: string;
    filePath: string;
};
declare type NumPair = number[];
declare type PresetInfo = {
    variable: string;
    url: string;
    title: string;
    pitch: number;
};
declare type ChordQueue = {
    when: number;
    destination: AudioNode;
    preset: WavePreset;
    pitch: number;
    duration: number;
    volume?: number;
    slides?: WaveSlide[];
};

declare class WebAudioFontPlayer {
    envelopes: WaveEnvelope[];
    loader: WebAudioFontLoader;
    afterTime: number;
    nearZero: number;
    createChannel(audioContext: AudioContext): WebAudioFontChannel;
    createReverberator(audioContext: AudioContext): WebAudioFontReverberator;
    limitVolume(volume: number | undefined): number;
    queueChord(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitches: number[], duration: number, volume?: number, slides?: WaveSlide[][]): WaveEnvelope[];
    queueStrumUp(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitches: number[], duration: number, volume?: number, slides?: WaveSlide[][]): WaveEnvelope[];
    queueStrumDown(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitches: number[], duration: number, volume?: number, slides?: WaveSlide[][]): WaveEnvelope[];
    queueStrum(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitches: number[], duration: number, volume?: number, slides?: WaveSlide[][]): WaveEnvelope[];
    queueSnap(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitches: number[], duration: number, volume?: number, slides?: WaveSlide[][]): WaveEnvelope[];
    resumeContext(audioContext: AudioContext): void;
    queueWaveTable(audioContext: AudioContext, target: AudioNode, preset: WavePreset, when: number, pitch: number, duration: number, volume?: number, slides?: WaveSlide[]): WaveEnvelope | null;
    noZeroVolume(n: number): number;
    setupEnvelope(audioContext: AudioContext, envelope: WaveEnvelope, zone: WaveZone, volume: number, when: number, sampleDuration: number, noteDuration: number): void;
    numValue(aValue: any, defValue: number): number;
    findEnvelope(audioContext: AudioContext, target: AudioNode): WaveEnvelope;
    adjustPreset: (audioContext: AudioContext, preset: WavePreset) => void;
    adjustZone: (audioContext: AudioContext, zone: WaveZone) => void;
    findZone(audioContext: AudioContext, preset: WavePreset, pitch: number): WaveZone | null;
    cancelQueue(audioContext: AudioContext): void;
}

declare class WebAudioFontReverberator {
    audioContext: AudioContext;
    output: GainNode;
    input: BiquadFilterNode;
    compressor: DynamicsCompressorNode;
    compressorWet: GainNode;
    compressorDry: GainNode;
    convolver: AudioNode | ConvolverNode | null;
    convolverInput: GainNode;
    dry: GainNode;
    wet: GainNode;
    irrArrayBuffer: ArrayBuffer;
    constructor(audioContext: AudioContext);
    irr: string;
}

declare class WebAudioFontTicker {
    stateStop: number;
    statePlay: number;
    stateEnd: number;
    state: number;
    stepDuration: number;
    lastPosition: number;
    playLoop(player: WebAudioFontPlayer, audioContext: AudioContext, loopStart: number, loopPosition: number, loopEnd: number, queue: ChordQueue[]): void;
    startTicks(audioContext: AudioContext, onTick: (when: number, from: number, to: number) => void, loopStart: number, loopPosition: number, loopEnd: number, onEnd: (loopPosition: number) => void): void;
    tick(audioContext: AudioContext, nextAudioTime: number, onTick: (when: number, from: number, to: number) => void, loopStart: number, loopPosition: number, loopEnd: number, onEnd: (loopPosition: number) => void): void;
    cancel(): void;
}
