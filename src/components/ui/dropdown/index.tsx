import { ContextMenu, Picker } from '@expo/ui/swift-ui';

export default function Dropdown(){

return(
<ContextMenu style={{ width: 150, height: 50 }}>
  <ContextMenu.Items>
    <Button
      systemImage="person.crop.circle.badge.xmark"
      onPress={() => console.log('Pressed1')}>
      Hello
    </Button>
    <Button
      variant="bordered"
      systemImage="heart"
      onPress={() => console.log('Pressed2')}>
      Love it
    </Button>
    <Picker
      label="Doggos"
      options={['very', 'veery', 'veeery', 'much']}
      variant="menu"
      selectedIndex={selectedIndex}
      onOptionSelected={({ nativeEvent: { index } }) => setSelectedIndex(index)}
    />
  </ContextMenu.Items>
  <ContextMenu.Trigger>
    <Button variant="bordered" style={{ width: 150, height: 50 }}>
      Show Menu
    </Button>
  </ContextMenu.Trigger>
</ContextMenu>
)}