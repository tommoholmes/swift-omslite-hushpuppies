import { gql } from '@apollo/client';

export const getPickPackConfigurations = gql`
query{
    getPickPackConfigurations{
      swiftoms_pickpack_batch_allow_manual_confirm_pick {
        is_default
        value
      }
      swiftoms_pickpack_batch_enable {
        is_default
        value
      }
      swiftoms_pickpack_batch_items_per_slot {
        is_default
        value
      }
      swiftoms_pickpack_batch_sorting_method {
        is_default
        value
      }
      swiftoms_pickpack_batch_use_camera_to_scan {
        is_default
        value
      }
      swiftoms_pickpack_wave_allow_manual_confirm_pick {
        is_default
        value
      }
      swiftoms_pickpack_wave_enable {
        is_default
        value
      }
      swiftoms_pickpack_wave_items_per_slot {
        is_default
        value
      }
      swiftoms_pickpack_wave_slots_per_picker {
        is_default
        value
      }
      swiftoms_pickpack_wave_use_camera_to_scan {
        is_default
        value
      }
    }
  }
`;

export const savePickPackConfigurations = gql`
mutation savePickPackConfigurations($input:PickPackConfigurationInput! ){
    savePickPackConfigurations(input: $input)
  }
`;

export default {
    getPickPackConfigurations,
    savePickPackConfigurations,
};
