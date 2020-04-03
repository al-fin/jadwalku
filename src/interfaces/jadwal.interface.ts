export interface pelajaranInterface {
  name: string;
  fullName: string;
  jam: number;
}

export interface JadwalPelajaranInterface {
  hari: string;
  jadwal: pelajaranInterface[];
  active: boolean;
}

export interface JadwalPiketInterface {
  hari: string;
  jadwal: string[];
  active: boolean;
}

export interface JadwalInterface {
  pelajaran: JadwalPelajaranInterface[],
  piket: JadwalPiketInterface[],
}

