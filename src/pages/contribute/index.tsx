import { Row, Button, Typography, Spin, notification } from "antd";
import { useHotkeys } from "react-hotkeys-hook";
import useRecorder from "@wmik/use-media-recorder";
import React from "react";
import FormData from "form-data";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/header";
import { useToggle } from "react-use";
import { v4 } from "uuid";
import { Cols, db, storage } from "../../server/firebase";
import { uploadBytes, ref as StorageRef } from "firebase/storage";
import { updateDoc, collection, doc, arrayUnion, query, orderBy, getDocs, limit, addDoc, DocumentReference} from "firebase/firestore";
 

interface WordType {
  ar: string;
  
  en: string;
   id: string;
};



export default function Page() {
  
 
  ///////////////////////////////////////////////////////////
  // Audiorecording instance
  ///////////////////////////////////////////////////////////
  const recorder = useRecorder({
    blobOptions: { endings: "transparent", type: "audio/webm" },
    mediaStreamConstraints: { audio: true, video: false },
    mediaRecorderOptions: { mime: "audio/webm" },
  });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [word, setWord] = React.useState<WordType | null>();

  async function getWord() {
    const {docs} = await getDocs(query(collection(db, "/"+ Cols.WORDS), orderBy("audios"), limit(1)))
    const f = docs[0]?.data()
    if (!f) return;
    
    const w: WordType = {
       id: docs[0]?.id || "",
      ar: f.ar,
      en: f.en,
     };
    
    setWord(w);
    

  }

  const audioRef = React.useRef<any>();
  const url = React.useMemo(() => {
    if (!recorder.mediaBlob) return "";
    return typeof window !== "undefined"
      ? URL.createObjectURL(recorder.mediaBlob)
      : "";
  }, [recorder.status, recorder.mediaBlob]);

  React.useEffect(() => {
    getWord();
  }, []);
  const sound = new FormData();
  React.useEffect(() => {
    sound.append("audio", recorder.mediaBlob);
  }, [recorder.status]);

  const [o, OF] = useToggle(false);
  const [, setError] = React.useState(false);

  async function submit() {
    try {
      // if (recorder.mediaBlob?.size === 0) return false;
      // if (!word?._id) return false;

      OF(true);
      setError(false);
      if (!recorder.mediaBlob) return false;
      if (recorder.status === "recording") recorder.stopRecording()
      setIsSubmitting(true);


      const clip = await uploadBytes(StorageRef(storage, `/clips/${v4()}`), recorder.mediaBlob);
      
      
      const audios = await addDoc(collection(db, `/${Cols.AUDIOS_TO_REVIEW}`), {
        
        word: doc(collection(db, `/${Cols.AUDIOS_TO_REVIEW}`),`/${word?.id}`) as DocumentReference,
        path: clip.metadata.fullPath
      });
      
      const w = await updateDoc(doc(collection(db, "/" + Cols.WORDS), `/${word?.id}`), {
        audios: arrayUnion(clip.metadata.fullPath)
      });

      console.log(w);
      
      // const s = await supabase.storage
      //   .from("audios")
      //   .upload(v4(), recorder.mediaBlob);
      // await axios({
      //   url: "api/words/audios/appens",
      //   method: "POST",
      //   data: {
      //     path: s.data?.path,
      //     word_id: word._id,
      //   },
      // });

      await getWord();

      OF(false);
      setIsSubmitting(false);
      recorder.clearMediaBlob();
      recorder.clearMediaStream();
      notification["success"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 40,
        btn: true,
      });
    } catch {
      OF(false);
      setError(true);
      notification["error"]({
        message: "تَم الحِفظ.",
        closeIcon: true,
        duration: 4000,
      });
    }
  }


  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Row className="flex flex-col w-full">
          <Row className=" flex justify-center align-middle">
            <Typography.Title className="text-7xl flex justify-center align-middle">
              {word?.ar} - {word?.en}
            </Typography.Title>
          </Row>
          <Row className="w-full">
            <audio src={url} preload="" controls className="w-full" />
          </Row>
          <Row className="flex flex-row justify-stretch h-80 gap-2 my-2 mx-0 relative">
            {o && (
              <Row className="flex flex-col absolute w-full h-full bg-slate-200 z-[9999]">
                <Spin />
                <Typography>إنتظر لحظة</Typography>
              </Row>
            )}

            {recorder.status === "recording" ? (
              <Button
                className={`flex-grow border border-red-600`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button>
            ) : (
              <Button
                className={`flex-grow`}
                onClick={() => recorder.startRecording()}
              >
                تَسجيل
              </Button>
            )}
            <Button
              onClick={() => recorder.stopRecording()}
              className="flex-grow"
            >
              صَهِِ!
            </Button>
            <Button onClick={submit} className="flex-grow">
              ارسل
            </Button>
          </Row>
          <Button onClick={async () => {
            
            for (let index = 0; index < 100; index++) {
              addDoc(collection(db, `/${Cols.WORDS}`), {
                ar: `كلمة ${index}`,
                en: `Word ${index}`,
                audios: []
              })
              
            }
            
            
          }}>ss</Button>
        </Row>
      </PageContainer>
    </>
  );
}
