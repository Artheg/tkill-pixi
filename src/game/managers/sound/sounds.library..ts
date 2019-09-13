export type AudioFormatType = "mp3" | "wav" | "ogg";

export class SoundData {
  constructor(
    public readonly name: string,
    public readonly type: AudioFormatType
  ) {}
}

export class SoundLibrary {
  public static readonly BASE_URL: string = "./assets/sounds/";

  public static readonly LIST: SoundData[] = [];

  public static readonly CHIME: SoundData = SoundLibrary.createSoundData(
    "beep",
    "wav"
  );

  private static createSoundData(
    name: string,
    format: AudioFormatType
  ): SoundData {
    const data: SoundData = new SoundData(name, format);
    SoundLibrary.LIST.push(data);
    return data;
  }
}
