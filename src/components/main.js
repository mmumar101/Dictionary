import React, { useState } from 'react';
import logo1 from '../images/iconoir_book.png';
import logo2 from '../images/fonts.png';
import toggle from '../images/toggle.png';
import logo5 from '../images/play.png';
import logo7 from '../images/tabler_external-link.png';
import logo8 from '../images/iconoir_search.png';
import togglenight from '../images/togglenight.png'
import axios from 'axios';
import { GetThemeValue } from './contextTheme';
import { api } from './api'


function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const {darkTheme, themeHandler} = GetThemeValue();
  const [audioData, setAudioData] = useState(null);



  const fetchData = () => { 
    axios.get(`${api}/${searchTerm}`).then(response => {
        setDefinition(response.data[0].meanings[0].definitions[0]);
        setSynonyms(response.data[0].meanings[0]);
        setSearchTerm(response.data[0]);
        setAudioData(response.data[0].phonetics[0].audio);
        console.log(response.data[0])

      }).catch((error)=>{
      if(error.response?.status===404){
        alert("Check Connection");
        console.log('Check Connection')
      }
      
    })
  };

//   useEffect(()=>{
//     fetchData()
//   },[])


  const handleForm = (e) => { 
    e.preventDefault()
    setSearchTerm(e.target.value)
 }


const playAudio = () => {
  if (audioData) {
    let audio = new Audio(audioData);
    audio.play();
  }
};


//####################################################################################
  return (
    <div className={`${darkTheme ? 'bg-[#000000]' : 'bg-white'} min-h-screen w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto px-5 `}>
      <div className='flex justify-between pt-7'> 
        <img src={logo1} alt='' className='h-5 w-5'/>
        <div className='flex gap-5'>
            <img src={logo2} alt='' className='h-5'/>
            
              <img 
              src={darkTheme ? togglenight : toggle} alt='' className='h-5'
              onClick={themeHandler}
              />
            {/* <img src={logo4} alt='' className='h-5' /> */}
        </div>

      </div>

      {/* ###########################-INPUT SEARCH-############################### */}
      

      <div className="flex">
        <div className="relative w-full">
            <input 
            onChange={handleForm}
            placeholder='Enter a Word'
             className={`${darkTheme ? 'bg-[#1F1F1F]' : 'bg-[#F2F2F2]'} ${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} mt-5 block p-2.5 w-full z-20 text-sm text-brown rounded-lg focus:outline-none `}
             />
            <button onClick={fetchData} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-brown">
                <img src={logo8} alt='' className='mt-5'/>
            </button>
        </div>
      </div>

      <div className='flex justify-between  mt-5'>
            <h2 className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} text-3xl font-bold`}>{searchTerm.word}</h2>

            <button onClick={playAudio}>
            <img src={logo5} alt='' className='w-11 h-11'/>
            </button>
        </div>

        <div>
            <p>{searchTerm.meaning}</p>
            <p className={`${darkTheme ? 'text-[#8f19e8]' : ' text-[#a445ed]'}`}>{searchTerm.phonetic}</p>
        
            <div className='flex mt-5 align-middle gap-2 '>
                <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} font-bold `}>noun</p>
                <hr className='w-full mt-3' />
            </div>
        </div>

        {/*################### MEANING  ####################### */}

        <div>
          <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} pt-7`}>Meaning</p>
        </div>

        <div className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} text-sm mt-3`}>
          <ul className=''>
            <li >{definition.definition}</li>
           </ul>
         </div>
        
        {/* ############# SYNONYMS ############## */}

        <div className='flex gap-7 mt-6'>
        <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} `}>Synonyms</p>
        <p className={`${darkTheme ? 'text-[#8f19e8]' : ' text-[#a445ed]'} justify-evenly mx-auto`}>{synonyms.synonyms}</p>
        </div>

        {/* ############# VERB ############ */}
        <div className='mt-5'>
          <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} font-semibold `}>Verb</p>
          <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} mt-4 `}>Example</p>
          <ul className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} text-sm  `}>
            <li>{definition.example}</li>
          </ul>
          <p className='mt-3 text-sm'></p>
        </div>

        {/* ############# SOURCE ############# */}
        <div className='mt-7 mb-7'>
          <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'} underline`}>Source</p>
          <div className='flex gap-2'>
            <p className={`${darkTheme ? 'text-[#f2f2f2]' : ' text-gray-900'}`}>https://en.wiktionary.org/wiki/keyboard</p>
            <img src={logo7} alt='' className='h-4 mt-1' />
          </div>
        </div>
      
    </div>

   
  )

}
 export default Dictionary