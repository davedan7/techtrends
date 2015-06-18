class RenameNameToNickname < ActiveRecord::Migration
  def change
    rename_column :users, :name, :nickname
  end
end
