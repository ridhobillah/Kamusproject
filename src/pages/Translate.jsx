  import { useState, useEffect } from "react";
  import SearchComp from "../components/SearchComp";
  import { Spinner } from "flowbite-react";
  import AOS from "aos";
  import "aos/dist/aos.css";

  export default function Translate() {
    const [search, setSearch] = useState("");
    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
      AOS.init();
    }, []);

    async function searchWord() { 
      if (search === "") return;

      setSearched(true);
      setLoading(true);

      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;

      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          const item = data[0];

          const audio = item.phonetics?.find((p) => p.audio)?.audio;

          setWordData({
            word: item.word,
            phonetic: item.phonetic,
            meanings: item.meanings,
            audio: audio,
          });
        } else {
          setWordData(null);
        }

        setSearch("");
      } catch (error) {
        setWordData(null);
      } finally {
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
              {/* LEFT */}
              <div className="md:border-r md:border-gray-200 md:pr-8">
                <SearchComp
                  search={search}
                  setSearch={setSearch}
                  onSearch={searchWord}
                />
              </div>

              {/* RIGHT */}
              <div className="md:pl-8 min-h-[300px] flex items-center justify-center">

                {loading ? (
                  <div className="text-center">
                    <Spinner />
                    <h1 className="text-white mt-2">Sedang mengambil data...</h1>
                  </div>

                ) : wordData ? (
                  <div className="space-y-4 w-full">
                    <h2 className="text-2xl font-semibold text-white">
                      {wordData.word}
                    </h2>

                    {wordData.phonetic && (
                      <p className="text-gray-500">{wordData.phonetic}</p>
                    )}

                    {wordData.audio && (
                      <audio controls className="w-full mt-2">
                        <source src={wordData.audio} type="audio/mpeg" />
                      </audio>
                    )}

                    {wordData.meanings.map((m, i) => (
                      <div key={i}>
                        <strong className="capitalize text-white">
                          {m.partOfSpeech} :
                        </strong>
                        <ul className="list-disc list-inside text-gray-100 mt-1">
                          {m.definitions.map((d, j) => (
                            <li key={j}>{d.definition}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>



                ) : searched ? (
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
