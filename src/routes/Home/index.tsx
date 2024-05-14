import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Input, Tour, TourProps } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { useHistory } from "react-router-dom";
import { Character_options, greetingtext } from "../../constant";
import MainContext from "../../context/mainContext";

import "./style.scss";

type TProfile = {
  name: string;
  gender: string | null
}

const Home = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(MainContext)

  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<TProfile>({
    name: '',
    gender: null
  })
  const [visibleInput, setVisibleInput] = useState<boolean>(false)
  const [visibleButton, setVisibleButton] = useState<boolean>(false)

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const tourContent = [
    { title: 'Next Button', desc: 'Click here for next and submit in these whole stage', target: () => ref1.current },
    { title: 'Character', desc: 'Choose your best character', target: () => ref2.current },
    { title: 'Nickname', desc: 'Give your character a name', target: () => ref3.current },
    { title: 'All Set', desc: 'Your ready to dive into Pokemon Deck World by Click This button', target: () => ref4.current }
  ]

  function resetTour() {
    setStep(1)
    setVisibleInput(false)
    setVisibleButton(false)
    setProfile({ name: '', gender: null })
    dispatch({ type: 'tour', payload: false })
  }

  const tourStep: TourProps['steps'] = tourContent.map(({ title, desc, target }) => (
    {
      title,
      description: desc,
      target,
      className: 'tour-setup',
      nextButtonProps: {
        onClick: () => {
          if (step <= 3) {
            setStep(prev => prev + 1)
            setVisibleInput(true)
            setVisibleButton(true)
          } else {
            resetTour()
          }
        }
      },
      prevButtonProps: {
        onClick: () => setStep(prev => prev - 1)
      },
      onClose: resetTour,
    }
  ))

  function toPokemons() {
    if (!state.tour) {
      dispatch({ type: 'add-profile', payload: profile })
      history.push(`/pokemons`);
    }
  }

  function handleSelectGender(val: any) {
    if (step === 2) {
      setProfile({ ...profile, gender: val })
      setTimeout(() => {
        setVisibleInput(true)
      }, 2000);
    }
  }

  function onNext() {
    if (nextValidation()) {
      setStep((prev) => prev + 1)

      if (step === 3) {
        setTimeout(() => {
          setVisibleButton(true)
        }, 2000);
      }
    }
  }

  function nextValidation() {
    if ((step === 2 && !profile.gender) || (step === 3 && !profile.name) || state.tour) {
      return false
    }

    return true
  }

  useEffect(() => {
    if (state.profile.name) {
      setProfile(state.profile)
      setStep(4)
    }
  }, [state])

  return (
    <div className="home" >
      {step > 1 && (
        <div ref={ref2}>
          <Zoom>
            <div className="char-container">
              {Character_options.map((val, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectGender(val.type)}
                  className={`char-card ${profile.gender && (profile.gender === val.type) && 'selected'} ${step > 2 && profile.gender !== val.type && 'hide'}`}
                >
                  <img src={val.image} alt={val.type} height="200px" />
                </div>
              ))}
            </div>
          </Zoom>
        </div>
      )}
      <div className="text-box" key={step}>
        <Fade cascade duration={50} className="fade-wrap">
          {`${step === 4 ? `Welcome, ${profile.name}` : ''} ${greetingtext[`step${step}`]}`}
        </Fade>
        {visibleInput && step === 3 &&
          <div ref={ref3}>
            <Fade>
              <Input placeholder="Input Character Name" className="input-name" onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </Fade>
          </div>
        }
        {step <= 3 && (
          <div className="next-button">
            <CaretDownOutlined ref={ref1} onClick={onNext} />
          </div>
        )}
      </div>
      {visibleButton && step === 4 ? (
        <div ref={ref4} className="d-flex align-items-center" style={{ height: '100px' }}>
          <Slide direction="down">
            <Button style={{ maxWidth: '33rem' }} onClick={toPokemons}>Dive in to Pokemon Deck World</Button>
          </Slide>

        </div>
      ) : <div style={{ height: '100px' }} />}
      <Tour open={state.tour} onClose={() => dispatch({ type: 'tour', payload: false })} steps={tourStep} />
    </div>
  );
};

export default Home;
