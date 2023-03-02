import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ModalPreferences({
  openModal,
  setOpenModal,
  preferences,
  handleSubmit,
  setCheckedOptions,
  checkedOptions,
}) {
  const cancelButtonRef = useRef(null);

  const handleCheckboxChange = (preference) => {
    if (checkedOptions.includes(preference)) {
      setCheckedOptions(checkedOptions.filter((o) => o !== preference));
    } else {
      setCheckedOptions([...checkedOptions, preference]);
    }
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <form
                  onSubmit={(e) => handleSubmit(e, checkedOptions)}
                  className="px-10 py-5"
                >
                  <div className="flex flex-col items-start justify-center mb-4">
                    {preferences.map((prefernce) => (
                      <label
                        key={prefernce}
                        className="inline-flex items-center gap-2 mt-3 mr-3 font-medium text-gray-700"
                      >
                        <input
                          type="checkbox"
                          value={prefernce}
                          checked={checkedOptions.includes(prefernce)}
                          onChange={() => handleCheckboxChange(prefernce)}
                          className="w-5 h-5 text-gray-600 form-checkbox"
                        />
                        {prefernce}
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="inline-block w-full px-5 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
