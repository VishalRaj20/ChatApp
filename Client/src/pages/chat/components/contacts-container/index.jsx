import { useEffect } from "react";
import NewDm from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import ContactList from "@/components/ui/Contact-list";
import { useAppStore } from "@/store";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {

  const {setDirectMessagesContacts, directMessagesContacts, channels, setChannels} = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, { withCredentials: true });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, { withCredentials: true });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    
    getContacts();
    getChannels();
  }, [setChannels, setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden ">
          <ContactList contacts={directMessagesContacts}/>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden ">
          <ContactList contacts={channels} isChannel={true}/>
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-3 md:bg-[#1c1d25]">
      <svg
        id="Logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e63946" />
            <stop offset="100%" stopColor="#f1faee" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffbe0b" />
            <stop offset="100%" stopColor="#fb5607" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a86ff" />
            <stop offset="100%" stopColor="#8338ec" />
          </linearGradient>
        </defs>

        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          fill="url(#grad1)"
          className="transition-transform duration-300 hover:scale-110"
        />
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          fill="url(#grad2)"
          className="transition-transform duration-300 hover:scale-110"
        />
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          fill="url(#grad3)"
          className="transition-transform duration-300 hover:scale-110"
        />
      </svg>

      <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text animate-pulse">
        Synchronous
      </span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 text-opacity-90 text-sm">{text}</h6>
  )
}