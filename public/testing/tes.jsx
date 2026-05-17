import { useState, useEffect } from "react";
import SearchComp from "../components/SearchComp";
import { Spinner } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Translate() {

  // useState = menyimpan data

  // Menyimpan inputan pencarian user
  const [search, setSearch] = useState("");

  // Menyimpan data dari API
  const [wordData, setWordData] = useState(null);

  // loading jika awal masuk loading maka false
  const [loading, setLoading] = useState(false);

  // Mengecek apakah user sudah pernah search
  const [searched, setSearched] = useState(false);

  // useEffect dijalankan sekali saat komponen pertama kali muncul
  useEffect(() => {
    AOS.init(); // Mengaktifkan animasi AOS
  }, []);

  // async = function yang bisa menggunakan await
  async function searchWord() {
    // Jika input kosong, hentikan function
    if (search === "") return;

    setSearched(true); // Tandai bahwa user sudah search makan menjalankan fungsi si searchWord
    setLoading(true); // Aktifkan loading

    // URL API dictionary
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;

    try {
     //merespon dan menunggu(await) (fetch)mengambil data dari api 

      const response = await fetch(url);

      // response.ok = mengecek apakah request berhasil (status 200)
      if (response.ok) {
        // await lagi karena json() juga butuh waktu
        // response.json() berfungsi untuk: Mengubah data dari API menjadi format JavaScript object yang bisa kita pakai.
        const data = await response.json();

        // API mengembalikan array, kita ambil data pertama
        const item = data[0];

        // find() = mencari 1 data pertama yang memenuhi kondisi
        // Di sini mencari phonetics yang punya audio
        const audio = item.phonetics?.find((p) => p.audio)?.audio; // mencegah error jika ada data yang tidak memiliki audio

        // Simpan data penting ke dalam state
        setWordData({
          word: item.word,
          phonetic: item.phonetic,
          meanings: item.meanings,
          audio: audio,
        });
      } else {
        // Jika kata tidak ditemukan
        setWordData(null);
      }

        // Kosongkan input setelah search
        setSearch("");
    } catch (error) {
      // Jika terjadi error (misalnya koneksi gagal)
      setWordData(null);
    } finally {
      // finally = akan selalu dijalankan
      // Matikan loading apapun hasilnya
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
      }}
    >
      <div
        data-aos="fade-up"
        className="min-h-screen flex items-center justify-center p-6"
      >
        <div className="w-full max-w-6xl bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT SIDE - FORM INPUT */}
            <div className="md:border-r md:border-gray-200 md:pr-8">
              <SearchComp
                search={search} // nilai input
                setSearch={setSearch} // fungsi untuk ubah input
                onSearch={searchWord} // jalankan pencarian
              />
            </div>

            {/* RIGHT SIDE - HASIL */}
            <div className="md:pl-8 min-h-[300px] flex items-center justify-center">
              {/* Jika loading true tampilkan spinner */}
              {loading ? (
                <div className="text-center">
                  <Spinner />
                  <h1 className="text-white mt-2">Sedang mengambil data...</h1>
                </div>
              ) : wordData ? (
                // Jika ada data tampilkan hasil
                <div className="space-y-4 w-full">
                  <h2 className="text-2xl font-semibold text-white">
                    {wordData.word}
                  </h2>

                  {/* Tampilkan phonetic jika ada */}
                  {wordData.phonetic && (
                    <p className="text-black">{wordData.phonetic}</p>
                  )}

                  {/* Tampilkan audio jika ada */}
                  {wordData.audio && (
                    <audio controls className="w-full mt-2">
                      <source src={wordData.audio} type="audio/mpeg" />
                    </audio>
                  )}

                  {/* Looping array meanings */}
                  {wordData.meanings.map((m, i) => (
                    // m = isi data tiap perulangan (misalnya noun, verb, dll)
                    // i = index / nomor urut (0, 1, 2, dst)
                    // i dipakai sebagai key supaya React bisa membedakan tiap item

                    <div key={i}>
                      {/* m.partOfSpeech artinya ambil jenis katanya */}
                      <strong className="capitalize text-white">
                        {m.partOfSpeech} :
                      </strong>

                      {/* Looping lagi karena definitions juga berupa array */}
                      <ul className="list-disc list-inside text-gray-100 mt-1">
                        {m.definitions.map((d, j) => (
                          // d = isi tiap definition (objek definisi)
                          // j = index dari definitions (0, 1, 2, dst)
                          // j dipakai sebagai key untuk setiap <li>

                          <li key={j}>
                            {/* d.definition artinya ambil teks definisinya */}
                            {d.definition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : searched ? (
                // Jika sudah search tapi tidak ada hasil
                <h1 className="text-white text-xl font-semibold">
                  text not found
                </h1>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
